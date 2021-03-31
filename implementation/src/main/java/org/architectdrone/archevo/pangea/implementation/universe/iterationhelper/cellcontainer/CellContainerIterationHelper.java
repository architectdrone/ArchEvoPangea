package org.architectdrone.archevo.pangea.implementation.universe.iterationhelper.cellcontainer;

import java.lang.reflect.Constructor;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.architectdrone.archevo.pangea.implementation.action.Action;
import org.architectdrone.archevo.pangea.implementation.action.Attack;
import org.architectdrone.archevo.pangea.implementation.action.Move;
import org.architectdrone.archevo.pangea.implementation.action.Reproduce;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.exceptions.IntersectionException;
import org.architectdrone.archevo.pangea.implementation.combathandler.CombatResult;
import org.architectdrone.archevo.pangea.implementation.isa.ISA;
import org.architectdrone.archevo.pangea.implementation.misc.OffsetToCell;
import org.architectdrone.archevo.pangea.implementation.universe.iterationhelper.cell.CellIterationResult;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.CellContainer;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.CellPosition;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;
import org.architectdrone.archevo.pangea.implementation.universe.iterationhelper.cell.CellIterationHelper;

public class CellContainerIterationHelper {
    public static CellContainer iterate(CellContainer cellContainer,
            UniverseSettings universeSettings,
            Random random) {
        List<CellIterationResultAndPosition> cellIterationResultAndPositionList = cellContainer
                .getAllPositions()
                .stream()
                .filter(
                        (cellPosition -> !cellPosition.cell.isDead())
                )
                .map(
                        (cellPosition) -> {
                            CellIterationResult cellIterationResult = CellIterationHelper.iterate(
                                    cellPosition.cell,
                                    universeSettings.getIsa(),
                                    getOffsetToCell(cellPosition.x, cellPosition.y, cellContainer),
                                    universeSettings.getIterationExecutionMode());
                            return new CellIterationResultAndPosition(cellIterationResult, cellPosition);
                        })
                .collect(Collectors.toList());

        CellContainer newCellContainer;
        try {
            Constructor constructor  = cellContainer.getClass().getConstructor(Integer.class);
            newCellContainer = (CellContainer) constructor.newInstance(cellContainer.getSize());
            newCellContainer.load(cellIterationResultAndPositionList.stream().map((a) -> new CellPosition(a.cell, a.x, a.y)).collect(Collectors.toList()));
        }
        catch (NoSuchMethodException e)
        {
            throw new RuntimeException("CellContainers must have a constructor that takes an Integer.");
        }
        catch (Exception e)
        {
            throw new RuntimeException("General instantiation failure. This is probably the fault of whatever CellContainer you are using.");
        }


        cellIterationResultAndPositionList.forEach((a) -> {
            a.cell.cellStats.age++; //Increment age.
            a.cell.setRegister(0, a.cell.getRegister(0)- universeSettings.getIterationCost());
            if (a.action != null) {
                runActionWithExternalEffects(a, newCellContainer, universeSettings, random);
            }
        });

        return newCellContainer;
    }

    private static void runActionWithExternalEffects(CellIterationResultAndPosition a, CellContainer newCellContainer, UniverseSettings universeSettings, Random random)
    {
        Action action = a.action;
        assert action.has_external_effect();
        Cell cell = a.cell;
        int cell_x = a.x;
        int cell_y = a.y;
        if (action instanceof Move)
        {
            runMoveAction((Move) action, cell_x, cell_y, cell, newCellContainer, universeSettings);
        }
        else if (action instanceof Attack)
        {
            runAttackAction((Attack) action, cell_x, cell_y, cell, newCellContainer, universeSettings);
        }
        else if (action instanceof Reproduce){
            runReproduceAction((Reproduce) action, cell_x, cell_y, cell, newCellContainer, universeSettings, random);
        }
        else
        {
            throw new RuntimeException("runActionWithExternalEffects called on an unknown state changing action");
        }
    }

    private static void runMoveAction(Move move, int initial_x, int initial_y, Cell cell, CellContainer newCellContainer, UniverseSettings universeSettings)
    {
        if (cell.getRegister(0) > universeSettings.getMoveCost()) {
            int new_x = initial_x + move.getXOffset();
            int new_y = initial_y + move.getYOffset();

            try {
                cell.setRegister(0, cell.getRegister(0) - universeSettings.getMoveCost());
                newCellContainer.set(new_x, new_y, cell);
                newCellContainer.delete(initial_x, initial_y);
            } catch (IntersectionException e) {
                //In this case we do nothing. The cell cannot move to the new location, because a cell is already there.
            }
        }
    }

    private static void runAttackAction(Attack attack, int cell_x, int cell_y, Cell cell, CellContainer newCellContainer, UniverseSettings universeSettings)
    {
        int attacking_x = cell_x+attack.getXOffset();
        int attacking_y = cell_y+attack.getYOffset();
        Cell defendingCell = newCellContainer.get(attacking_x, attacking_y);
        CombatResult result = universeSettings.getCombatHandler().getResult(cell, defendingCell);
        cell.setRegister(0, cell.getRegister(0)+ result.getAttackerEnergyChange());
        if (newCellContainer.get(attacking_x, attacking_y) != null)
        {
            defendingCell.setRegister(0, defendingCell.getRegister(0)+ result.getDefenderEnergyChange());
        }
    }

    private static void runReproduceAction(Reproduce reproduce, int cell_x, int cell_y, Cell cell, CellContainer newCellContainer, UniverseSettings universeSettings, Random random)
    {
        int reproducing_x = cell_x+reproduce.getXOffset();
        int reproducing_y = cell_y+reproduce.getYOffset();

        if (universeSettings.getReproductionHandler().canReproduce(cell))
        {
            try {
                Cell baby_cell = getBabyCell(cell, universeSettings.getReproductionHandler().newCellEnergy(cell), universeSettings.getMutationChance(), random, universeSettings.getIsa());
                baby_cell.cellStats.lineage = cell.cellStats.lineage+1;
                baby_cell.cellStats.parent_id = cell.getId();
                if (cell.cellStats.lineage == 0) {
                    baby_cell.cellStats.newSpeciesColor(random);
                }
                else
                {
                    baby_cell.cellStats.species_h = cell.cellStats.species_h;
                    baby_cell.cellStats.species_s = cell.cellStats.species_s;
                    baby_cell.cellStats.species_v = cell.cellStats.species_v;
                    baby_cell.cellStats.mutateSpeciesColor(random);
                }
                newCellContainer.set(reproducing_x, reproducing_y, baby_cell);

                cell.setRegister(0, cell.getRegister(0)-universeSettings.getReproductionHandler().reproductionEnergyCost(cell));
                cell.cellStats.virility++;
            } catch (IntersectionException e) {
                //If we encounter an exception, that means a cell is already in the place the parent wanted to reproduce in.
            }
        }
    }

    private static Cell getBabyCell(Cell parent, int initialEnergy, float mutation_chance, Random random, ISA isa) {
        Cell baby = new Cell(mutateGenome(parent.getGenome(), mutation_chance, random, isa), isa);
        baby.setRegister(0, initialEnergy);
        return baby;
    }

    private static List<Integer> mutateGenome(List<Integer> initial_genome, float mutation_chance, Random random, ISA isa)
    {
        List<Integer> genome_to_return = new ArrayList<>();
        initial_genome.forEach((a) -> genome_to_return.add(mutateGene(a, mutation_chance, random, isa)));
        return genome_to_return;
    }

    private static Integer mutateGene(Integer gene, float mutation_chance, Random random, ISA isa)
    {
        Function<Float, Integer> get1Random = (a) -> {
            if (random.nextFloat() < mutation_chance) return 1;
            else return 0;
        };

        Integer mask = 0;

        for (int i = 0; i < isa.getNumberOfBitsPerInstruction(); i++)
        {
            mask = mask << 1;
            mask += get1Random.apply(mutation_chance);
        }
        return gene ^ mask;
    }

    private static OffsetToCell getOffsetToCell(int base_x, int base_y, CellContainer cellContainer) {
        return (x_offset, y_offset) -> cellContainer.get(base_x+x_offset, base_y+y_offset);
    }
}

class CellIterationResultAndPosition {
    public final Cell cell;
    public final int x;
    public final int y;
    public final Action action;

    public CellIterationResultAndPosition(CellIterationResult cellIterationResult, CellPosition cellPosition) {
        cell = cellIterationResult.new_state;
        action = cellIterationResult.external_state_changing_action;
        x = cellPosition.x;
        y = cellPosition.y;
    }
}