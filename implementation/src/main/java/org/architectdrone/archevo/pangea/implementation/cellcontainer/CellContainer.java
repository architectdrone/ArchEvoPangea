package org.architectdrone.archevo.pangea.implementation.cellcontainer;

import java.util.List;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.exceptions.AlreadyLoadedException;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.exceptions.IntersectionException;

public interface CellContainer {
    int getSize();
    void set(int x, int y, Cell cell) throws IntersectionException;
    Cell get(int x, int y);
    Cell getSafe(int x, int y);
    void delete(int x, int y);
    List<Cell> getAll();
    List<CellPosition> getAllPositions();
    List<CellPosition> getAllPositionsSafe();
    void load(List<CellPosition> cells) throws AlreadyLoadedException;
}
