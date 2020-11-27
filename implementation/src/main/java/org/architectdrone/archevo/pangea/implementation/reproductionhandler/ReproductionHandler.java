package org.architectdrone.archevo.pangea.implementation.reproductionhandler;

import org.architectdrone.archevo.pangea.implementation.cell.Cell;

public interface ReproductionHandler {
    public boolean canReproduce(Cell parent);

    public int reproductionEnergyCost(Cell parent);

    public int newCellEnergy(Cell parent);
}
