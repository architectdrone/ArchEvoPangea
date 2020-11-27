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

    private final Random randomness;
    public final UniverseSettings universeSettings;
    @Getter
    private CellContainer cellContainer;
    @Getter
    private int numberOfIterations = 0;


    public Universe(UniverseSettings universeSettings) {
        this.universeSettings = universeSettings;
        this.cellContainer = new LinearContainer(universeSettings.getSize());
        this.randomness = new Random(universeSettings.getSeed());
    }

    public void iterate() throws Exception {
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