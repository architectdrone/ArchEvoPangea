package org.architectdrone.archevo.pangea.implementation.universe.iterationhelper.cellcontainer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.architectdrone.archevo.pangea.implementation.action.Attack;
import org.architectdrone.archevo.pangea.implementation.action.Move;
import org.architectdrone.archevo.pangea.implementation.action.RegisterUpdate;
import org.architectdrone.archevo.pangea.implementation.action.Reproduce;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.exceptions.IntersectionException;
import org.architectdrone.archevo.pangea.implementation.combathandler.CaptureTheFlag;
import org.architectdrone.archevo.pangea.implementation.isa.MalformedInstructionException;
import org.architectdrone.archevo.pangea.implementation.isa.ParsingException;
import org.architectdrone.archevo.pangea.implementation.isa.asia.ASIA;
import org.architectdrone.archevo.pangea.implementation.isa.asia.ASIARegister;
import org.architectdrone.archevo.pangea.implementation.universe.IterationExecutionMode;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.CellContainer;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.LinearContainer;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CellContainerIterationHelperTest {
    int size = 20;
    CellContainer cellContainer;
    Cell cell;

    @Nested
    class CorrectResponseToActionProducedByISA {
        @BeforeEach
        void beforeEach() {
            cellContainer = new LinearContainer(size);
        }

        @Test
        void RegisterUpdateAction() throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .moveCost(0)
                    .iterationCost(1)
                    .mutationChance(0.0f)
                    .build();

            Integer binary_instruction = universeSettings.getIsa().stringToBinary("INCREMENT REG_A");
            Integer register_number = ASIARegister.fromString("REG_A").toBinary();

            List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));
            genome.set(0, binary_instruction);


            cell = new Cell(genome, null);
            cell.setRegister(register_number, 5);
            cell.setRegister(0, 5);

            RegisterUpdate isa_result = (RegisterUpdate) universeSettings.getIsa().getAction(cell, (x, y) -> null);

            cellContainer.set(1, 1, cell);
            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
            Cell resultant_cell = newCellContainer.get(1, 1);

            assertEquals(isa_result.getNewValue(), resultant_cell.getRegister(isa_result.getRegisterToChange()));
            assertEquals(1, resultant_cell.getIP());
            assertEquals(1, resultant_cell.cellStats.age);
            assertEquals(4, resultant_cell.getRegister(0));
        }

        @Test
        void MoveAction () throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .moveCost(1)
                    .iterationCost(0)
                    .mutationChance(0.0f)
                    .build();

            Integer binary_instruction = universeSettings.getIsa().stringToBinary("MOVE");

            List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));
            genome.set(0, binary_instruction);

            cell = new Cell(genome, null);
            cell.setRegister(0b111, 0b10000000);
            cell.setRegister(0, 5);
            Move isa_result = (Move) universeSettings.getIsa().getAction(cell, (x, y) -> null);

            cellContainer.set(1, 1, cell);

            int new_x = isa_result.getXOffset() + 1;
            int new_y = isa_result.getYOffset() + 1;

            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());

            assertNotEquals(null, newCellContainer.get(new_x, new_y));
            assertEquals(null, newCellContainer.get(1, 1));
            assertEquals(4, newCellContainer.get(new_x, new_y).getRegister(0));
            assertEquals(1, newCellContainer.get(new_x, new_y).cellStats.age);
        }

        @Test
        void MoveAction_whenCellAlreadyExistsInDesiredLocation () throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .moveCost(1)
                    .iterationCost(0)
                    .mutationChance(0.0f)
                    .build();

            Integer binary_instruction = universeSettings.getIsa().stringToBinary("MOVE");

            List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));
            genome.set(0, binary_instruction);

            cell = new Cell(genome, null);
            cell.setRegister(0b111, 0b10000000);
            cell.setRegister(0, 5);
            Move isa_result = (Move) universeSettings.getIsa().getAction(cell, (x, y) -> null);

            cellContainer.set(1, 1, cell);

            int new_x = isa_result.getXOffset() + 1;
            int new_y = isa_result.getYOffset() + 1;

            Cell blocking_cell = new Cell(new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED"))), null);

            cellContainer.set(new_x, new_y, blocking_cell);

            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());

            assertEquals(4, newCellContainer.get(1, 1).getRegister(0));
            assertEquals(cell.getGenome(), newCellContainer.get(1, 1).getGenome());
            assertEquals(blocking_cell.getGenome(), newCellContainer.get(new_x, new_y).getGenome());
            assertEquals(1, newCellContainer.get(1, 1).cellStats.age);
        }

        @Test
        void MoveAction_whenNotEnoughEnergy () throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .moveCost(6)
                    .iterationCost(0)
                    .mutationChance(0.0f)
                    .build();
            Integer binary_instruction = universeSettings.getIsa().stringToBinary("MOVE");

            List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));
            genome.set(0, binary_instruction);

            cell = new Cell(genome, null);
            cell.setRegister(0b111, 0b10000000);
            cell.setRegister(0, 5);
            Move isa_result = (Move) universeSettings.getIsa().getAction(cell, (x, y) -> null);

            cellContainer.set(1, 1, cell);

            int new_x = isa_result.getXOffset() + 1;
            int new_y = isa_result.getYOffset() + 1;

            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());

            assertNull(newCellContainer.get(new_x, new_y));
            assertEquals(5, newCellContainer.get(1, 1).getRegister(0));
            assertEquals(cell.getGenome(), newCellContainer.get(1, 1).getGenome());
            assertEquals(1, newCellContainer.get(1, 1).cellStats.age);
        }

        @Test
        void ReproductionAction_whenEnoughEnergy () throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .moveCost(0)
                    .iterationCost(0)
                    .mutationChance(0.0f)
                    .build();
            Integer binary_instruction = universeSettings.getIsa().stringToBinary("REPRODUCE");

            List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));
            genome.set(0, binary_instruction);

            cell = new Cell(genome, null);
            cell.setRegister(0b111, 0b10000000);
            cell.setRegister(0b000, universeSettings.getReproductionHandler().reproductionEnergyCost(cell)+1);

            Reproduce isa_result = (Reproduce) universeSettings.getIsa().getAction(cell, (x, y) -> null);

            cellContainer.set(1, 1, cell);

            int new_cell_x = isa_result.getXOffset() + 1;
            int new_cell_y = isa_result.getYOffset() + 1;

            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());

            assertNotEquals(null, newCellContainer.get(new_cell_x, new_cell_y));
            assertEquals(universeSettings.getReproductionHandler().newCellEnergy(cell), newCellContainer.get(new_cell_x, new_cell_y).getRegister(0));
            assertNotEquals(null, newCellContainer.get(1, 1));
            assertEquals(1, newCellContainer.get(1,1).getRegister(0));
            assertEquals(1, newCellContainer.get(new_cell_x, new_cell_y).cellStats.lineage);
            assertEquals(0, newCellContainer.get(new_cell_x, new_cell_y).cellStats.age);
            assertEquals(1, newCellContainer.get(1, 1).cellStats.virility);
            assertEquals(1, newCellContainer.get(1, 1).cellStats.age);
        }

        @Test
        void ReproductionAction_whenEnoughEnergy_and100PercentMutationChance () throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .moveCost(0)
                    .iterationCost(0)
                    .mutationChance(1.0f)
                    .build();
            Integer binary_instruction = universeSettings.getIsa().stringToBinary("REPRODUCE");

            List<Integer> genome = new ArrayList<>(Collections.nCopies(16, 0b00000000000));
            genome.set(0, binary_instruction);

            cell = new Cell(genome, null);
            cell.setRegister(0b111, 0b10000000);
            cell.setRegister(0b000, universeSettings.getReproductionHandler().reproductionEnergyCost(cell)+1);

            Reproduce isa_result = (Reproduce) universeSettings.getIsa().getAction(cell, (x, y) -> null);

            cellContainer.set(1, 1, cell);

            int new_cell_x = isa_result.getXOffset() + 1;
            int new_cell_y = isa_result.getYOffset() + 1;

            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());

            assertEquals(0b11111111111, newCellContainer.get(new_cell_x, new_cell_y).getGenome().get(1));
        }

        @Test
        void ReproductionAction_whenNotEnoughEnergy () throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .moveCost(0)
                    .iterationCost(0)
                    .mutationChance(0.0f)
                    .build();
            Integer binary_instruction = universeSettings.getIsa().stringToBinary("REPRODUCE");

            List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));
            genome.set(0, binary_instruction);

            cell = new Cell(genome, null);
            cell.setRegister(0b111, 0b10000000);
            cell.setRegister(0b000, universeSettings.getReproductionHandler().reproductionEnergyCost(cell)-1);

            Reproduce isa_result = (Reproduce) universeSettings.getIsa().getAction(cell, (x, y) -> null);

            cellContainer.set(1, 1, cell);

            int new_cell_x = isa_result.getXOffset() + 1;
            int new_cell_y = isa_result.getYOffset() + 1;

            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());

            assertEquals(null, newCellContainer.get(new_cell_x, new_cell_y));
            assertNotEquals(null, newCellContainer.get(1, 1));
            assertEquals(universeSettings.getReproductionHandler().reproductionEnergyCost(cell)-1, newCellContainer.get(1, 1).getRegister(0) );
            assertEquals(1, newCellContainer.get(1, 1).cellStats.age);
        }

        @Test
        void ReproductionAction_whenCellIsWhereItWantedToReproduce () throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .moveCost(1)
                    .iterationCost(0)
                    .mutationChance(0.0f)
                    .build();
            Integer binary_instruction = universeSettings.getIsa().stringToBinary("REPRODUCE");

            List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));
            genome.set(0, binary_instruction);

            cell = new Cell(genome, null);
            cell.setRegister(0b111, 0b10000000);
            cell.setRegister(0b000, universeSettings.getReproductionHandler().reproductionEnergyCost(cell)+1);

            Reproduce isa_result = (Reproduce) universeSettings.getIsa().getAction(cell, (x, y) -> null);

            cellContainer.set(1, 1, cell);

            int new_cell_x = isa_result.getXOffset() + 1;
            int new_cell_y = isa_result.getYOffset() + 1;

            Cell blocking_cell = new Cell(new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED"))), null);
            cellContainer.set(new_cell_x, new_cell_y, blocking_cell);

            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());

            assertEquals(blocking_cell.getGenome(), newCellContainer.get(new_cell_x, new_cell_y).getGenome());
            assertEquals(cell.getGenome(), newCellContainer.get(1, 1).getGenome());
            assertEquals(universeSettings.getReproductionHandler().reproductionEnergyCost(cell)+1, newCellContainer.get(1, 1).getRegister(0) );
            assertEquals(1, newCellContainer.get(1, 1).cellStats.age);
        }

        @Test
        void AttackAction () throws Exception {
            UniverseSettings universeSettings = UniverseSettings.builder()
                    .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                    .combatHandler(new CaptureTheFlag())
                    .moveCost(1)
                    .iterationCost(0)
                    .mutationChance(0.0f)
                    .build();
            Integer binary_instruction = universeSettings.getIsa().stringToBinary("ATTACK");

            int attacker_initial_energy = universeSettings.getInitialEnergy();
            int defender_initial_energy = universeSettings.getInitialEnergy();

            int logo  = 0b11111111;
            int guess = 0b11111110;

            List<Integer> defender_genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));;
            List<Integer> attacker_genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));
            attacker_genome.set(0, binary_instruction);

            Cell attacker_cell = new Cell(attacker_genome, null);
            Cell defender_cell = new Cell(defender_genome, null);
            attacker_cell.setRegister(0b111, 0b10000000);
            attacker_cell.setRegister(0b000, attacker_initial_energy);
            defender_cell.setRegister(0b000, defender_initial_energy);
            Attack isa_result = (Attack) universeSettings.getIsa().getAction(attacker_cell, (x, y) -> null);
            int attacking_x = isa_result.getXOffset() + 1;
            int attacking_y = isa_result.getYOffset() + 1;

            cellContainer.set(1, 1, attacker_cell);
            cellContainer.set(attacking_x, attacking_y, defender_cell);

            CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());

            int gained_energy = universeSettings.getCombatHandler().getResult(attacker_cell, defender_cell).getAttackerEnergyChange();
            int lost_energy = universeSettings.getCombatHandler().getResult(attacker_cell, defender_cell).getDefenderEnergyChange();

            assertEquals(attacker_initial_energy+gained_energy, newCellContainer.get(1,1).getRegister(0b000));
            assertEquals(defender_initial_energy+lost_energy, newCellContainer.get(attacking_x,attacking_y).getRegister(0b000));
            assertEquals(1, newCellContainer.get(1, 1).cellStats.age);
            assertEquals(1, newCellContainer.get(attacking_x, attacking_y).cellStats.age);
        }
    }

    @Test
    void deadCells_areRemoved() throws IntersectionException, ParsingException, MalformedInstructionException {
        UniverseSettings universeSettings = UniverseSettings.builder()
                .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                .moveCost(1)
                .iterationCost(0)
                .mutationChance(0.0f)
                .build();
        cellContainer = new LinearContainer(15);

        List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED")));;
        Cell cell = new Cell(genome, null);
        cell.setRegister(0, -5);
        assertTrue(cell.isDead());
        cellContainer.set(1, 1, cell);
        CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
        assertEquals(0, newCellContainer.getAll().size());
    }

    @Test
    void instructionByInstructionMode_incrementsIPEachTimeItRuns() throws Exception {
        UniverseSettings universeSettings = UniverseSettings.builder()
                .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                .moveCost(1)
                .iterationCost(0)
                .mutationChance(0.0f)
                .build();
        cellContainer = new LinearContainer(size);
        cell = new Cell(new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("UNASSIGNED"))), null);
        cell.setRegister(0, 5);
        cellContainer.set(1, 1, cell);
        CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
        assertEquals(1, newCellContainer.get(1, 1).getIP());
        newCellContainer = CellContainerIterationHelper.iterate(newCellContainer, universeSettings, new Random());
        assertEquals(2, newCellContainer.get(1, 1).getIP());
    }

    @Test
    void untilStateChangeOrN_runsUntilStateChange() throws Exception {
        UniverseSettings universeSettings = UniverseSettings.builder()
                .iterationExecutionMode(IterationExecutionMode.RUN_UNTIL_STATE_CHANGE_OR_N)
                .moveCost(1)
                .iterationCost(0)
                .mutationChance(0.0f)
                .build();
        cellContainer = new LinearContainer(size);
        List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("INCREMENT REG_A")));
        genome.set(4, universeSettings.getIsa().stringToBinary("ATTACK"));
        cell = new Cell(genome, null);
        cell.setRegister(0b111, 0b00010000);
        cellContainer.set(1, 1, cell);
        CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
        assertEquals(4, newCellContainer.get(1, 1).getRegister(3));
        assertEquals(0, newCellContainer.get(1, 1).getIP());
    }

    @Test
    void untilStateChangeOrN_runsUntilN() throws Exception {
        UniverseSettings universeSettings = UniverseSettings.builder()
                .iterationExecutionMode(IterationExecutionMode.RUN_UNTIL_STATE_CHANGE_OR_N)
                .moveCost(1)
                .iterationCost(0)
                .mutationChance(0.0f)
                .build();
        cellContainer = new LinearContainer(size);
        List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("INCREMENT REG_A")));
        cell = new Cell(genome, null);
        cellContainer.set(1, 1, cell);
        CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
        assertEquals(16, newCellContainer.get(1, 1).getRegister(3));
        assertEquals(0, newCellContainer.get(1, 1).getIP());
    }

    @Test
    void untilStateChangeOrNSaveIP_runsUntilStateChange() throws Exception {
        UniverseSettings universeSettings = UniverseSettings.builder()
                .iterationExecutionMode(IterationExecutionMode.RUN_UNTIL_STATE_CHANGE_OR_N_SAVE_IP)
                .moveCost(1)
                .iterationCost(0)
                .mutationChance(0.0f)
                .build();
        cellContainer = new LinearContainer(size);
        List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("INCREMENT REG_A")));
        genome.set(4, universeSettings.getIsa().stringToBinary("ATTACK"));
        cell = new Cell(genome, null);
        cell.setRegister(0b111, 0b00010000);
        cellContainer.set(1, 1, cell);
        CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
        assertEquals(4, newCellContainer.get(1, 1).getRegister(3));
        assertEquals(5, newCellContainer.get(1, 1).getIP());
    }

    @Test
    void untilStateChangeOrNSaveIP_runsUntilN() throws Exception {
        UniverseSettings universeSettings = UniverseSettings.builder()
                .iterationExecutionMode(IterationExecutionMode.RUN_UNTIL_STATE_CHANGE_OR_N_SAVE_IP)
                .moveCost(1)
                .iterationCost(0)
                .mutationChance(0.0f)
                .build();
        cellContainer = new LinearContainer(size);
        List<Integer> genome = new ArrayList<>(Collections.nCopies(16, universeSettings.getIsa().stringToBinary("INCREMENT REG_A")));
        cell = new Cell(genome, null);
        cellContainer.set(1, 1, cell);
        CellContainer newCellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
        assertEquals(16, newCellContainer.get(1, 1).getRegister(3));
        assertEquals(0, newCellContainer.get(1, 1).getIP());
    }

    @Test
    void speedTest_IterationByIteration() throws Exception {
        UniverseSettings universeSettings = UniverseSettings.builder()
                .iterationExecutionMode(IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION)
                .moveCost(1)
                .iterationCost(0)
                .mutationChance(0.0f)
                .build();
        CellContainer cellContainer = new LinearContainer(50);
        Random random = new Random(42069);
        for (int i = 0; i < 50; i++) {
            try {
                cellContainer.set(random.nextInt(50), random.nextInt(50), getRandomCell(random));
            } catch (Exception e) {
            }
        }
        int number_of_iterations = 1000;
        long start = System.currentTimeMillis();
        for (int i = 0; i < number_of_iterations; i++) {
            cellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
        }
        long end = System.currentTimeMillis();
        long elapsed_ms = end-start;
        float iterations_per_ms = (float) number_of_iterations/ (float) elapsed_ms;
        int iterations_per_s = (int) (iterations_per_ms * (float) 1000);
        System.out.println("INSTRUCTION_BY_INSTRUCTION runs at about " + iterations_per_s + " iterations per second.");
        System.out.println(cellContainer.get(0, 0));
    }

    @Test
    void speedTest_RunUntilNoSaveIP() throws Exception {
        UniverseSettings universeSettings = UniverseSettings.builder()
                .iterationExecutionMode(IterationExecutionMode.RUN_UNTIL_STATE_CHANGE_OR_N)
                .moveCost(1)
                .iterationCost(0)
                .mutationChance(0.0f)
                .build();
        CellContainer cellContainer = new LinearContainer(50);
        Random random = new Random(42069);
        for (int i = 0; i < 50; i++) {
            try {
                cellContainer.set(random.nextInt(50), random.nextInt(50), getRandomCell(random));
            } catch (Exception e) {
            }
        }

        int number_of_iterations = 1000;
        long start = System.currentTimeMillis();
        for (int i = 0; i < number_of_iterations; i++) {
            cellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, new Random());
        }
        long end = System.currentTimeMillis();
        long elapsed_ms = end-start;
        float iterations_per_ms = (float) number_of_iterations/ (float) elapsed_ms;
        int iterations_per_s = (int) (iterations_per_ms * (float) 1000);
        System.out.println("RUN_UNTIL_STATE_CHANGE_OR_N runs at about " + iterations_per_s + " iterations per second.");
        System.out.println(cellContainer.get(0, 0));
    }

    Cell getRandomCell(Random random) {
        List<Integer> genome = new ArrayList<>();
        for (int i = 0; i < 16; i++) {
            genome.add(random.nextInt((int) Math.pow(2, 11)));
        }
        return new Cell(genome, new ASIA());
    }
}