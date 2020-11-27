package org.architectdrone.archevo.pangea.webserver.model;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.combathandler.CaptureTheFlag;
import org.architectdrone.archevo.pangea.implementation.combathandler.CaptureTheFlagPercentage;
import org.architectdrone.archevo.pangea.implementation.combathandler.CombatHandler;
import org.architectdrone.archevo.pangea.implementation.isa.ISA;
import org.architectdrone.archevo.pangea.implementation.isa.asia.ASIA;
import org.architectdrone.archevo.pangea.implementation.reproductionhandler.ReproductionHandler;
import org.architectdrone.archevo.pangea.implementation.reproductionhandler.SetCost;
import org.architectdrone.archevo.pangea.implementation.universe.Universe;

@Getter
public class UniverseInformationModel {
    String ISA;
    String iterationExecutionMode;
    String combatHandler;
    String reproductionHandler;
    Float mutationChance;
    Integer size;
    Integer influxRate;
    Integer moveCost;
    Integer iterationCost;
    Integer initialEnergy;
    Integer numberOfGenes;
    Integer seed;

    Integer iterations;
    Integer numberOfOrganisms;
    Double averageAge;
    Integer greatestAge;
    Integer greatestVirility;
    Integer greatestLineage;

    public UniverseInformationModel(Universe universe)
    {
        this.initialEnergy = universe.getUniverseSettings().getInitialEnergy();
        this.numberOfGenes = universe.getUniverseSettings().getNumberOfGenes();
        this.seed = universe.getUniverseSettings().getSeed();
        this.size = universe.getUniverseSettings().getSize();
        this.influxRate = universe.getUniverseSettings().getInfluxRate();
        this.moveCost = universe.getUniverseSettings().getMoveCost();
        this.iterationCost = universe.getUniverseSettings().getIterationCost();
        this.iterationExecutionMode = universe.getUniverseSettings().getIterationExecutionMode().name();
        this.mutationChance = universe.getUniverseSettings().getMutationChance();
        this.ISA = getISAName(universe.getUniverseSettings().getIsa());
        this.combatHandler = getCombatHandlerName(universe.getUniverseSettings().getCombatHandler());
        this.reproductionHandler = getReproductionHandlerName(universe.getUniverseSettings().getReproductionHandler());

        this.iterations = universe.getNumberOfIterations();
        this.numberOfOrganisms = universe.getCellContainer().getAll().size();
        this.averageAge = universe.getCellContainer().getAll().stream().mapToInt(cell -> cell.cellStats.age).average().getAsDouble();
        this.greatestAge = universe.getCellContainer().getAll().stream().mapToInt(cell -> cell.cellStats.age).max().getAsInt();
        this.greatestVirility = universe.getCellContainer().getAll().stream().mapToInt(cell -> cell.cellStats.virility).max().getAsInt();
        this.greatestLineage = universe.getCellContainer().getAll().stream().mapToInt(cell -> cell.cellStats.lineage).max().getAsInt();
    }

    private String getReproductionHandlerName(ReproductionHandler reproductionHandler)
    {
        if (reproductionHandler.getClass() == SetCost.class)
        {
            return "Set Cost";
        }
        else
        {
            return "Unknown";
        }
    }

    private String getCombatHandlerName(CombatHandler combatHandler)
    {
        if (combatHandler.getClass() == CaptureTheFlag.class)
        {
            return "Capture the Flag";
        }
        else if (combatHandler.getClass() == CaptureTheFlagPercentage.class)
        {
            return "Capture the Flag, Percentage";
        }
        else
        {
            return "Unknown";
        }
    }

    private String getISAName(ISA isa)
    {
        if (isa.getClass() == ASIA.class)
        {
            return "ASIA";
        }
        else
        {
            return "Unknown";
        }
    }
}
