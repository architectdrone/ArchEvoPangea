package org.architectdrone.archevo.pangea.implementation.universe;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.CellContainer;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.LinearContainer;
import org.architectdrone.archevo.pangea.implementation.universe.iterationhelper.cellcontainer.CellContainerIterationHelper;

public class Universe {

    protected final Random randomness;
    @Getter public final UniverseSettings universeSettings;
    @Getter
    protected CellContainer cellContainer;
    @Getter
    protected int numberOfIterations = 0;


    public Universe(UniverseSettings universeSettings) {
        this.universeSettings = universeSettings;
        this.cellContainer = new LinearContainer(universeSettings.getSize());
        this.randomness = new Random(universeSettings.getSeed());
    }

    protected Universe(Random randomness, UniverseSettings universeSettings, CellContainer cellContainer, int numberOfIterations)
    {
        this.randomness = randomness;
        this.universeSettings = universeSettings;
        this.cellContainer = cellContainer;
        this.numberOfIterations = numberOfIterations;
    }

    public void iterate() {
        numberOfIterations++;
        for (int i = 0; i < universeSettings.getInfluxRate(); i++)
        {
            int random_x = randomness.nextInt(cellContainer.getSize());
            int random_y = randomness.nextInt(cellContainer.getSize());
            try {
                addRandomCell(random_x, random_y);
            }
            catch (Exception e) {

            }

        }
        cellContainer = CellContainerIterationHelper.iterate(cellContainer, universeSettings, randomness);
    }

    public static Universe iterateAndReturn(Universe initialUniverse) {
        Universe newUniverse = new Universe(initialUniverse.randomness, initialUniverse.universeSettings, initialUniverse.cellContainer, initialUniverse.numberOfIterations);
        newUniverse.iterate();
        return newUniverse;
    }

    private void addRandomCell(int x, int y) throws Exception {
        List<Integer> genome = new ArrayList<>();
        for (int i = 0; i < universeSettings.getNumberOfGenes(); i++) {
            genome.add(randomness.nextInt((int) Math.pow(2, universeSettings.getIsa().getNumberOfBitsPerInstruction())) );
        }
        Cell cell = new Cell(genome, universeSettings.getIsa());
        cell.setRegister(0, universeSettings.getInitialEnergy());
        cellContainer.set(x, y, cell);
    }

    public Cell get(int x, int y)
    {
        return cellContainer.get(x, y);
    }
}