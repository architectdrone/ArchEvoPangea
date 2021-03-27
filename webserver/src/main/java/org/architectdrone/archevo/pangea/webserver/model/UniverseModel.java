package org.architectdrone.archevo.pangea.webserver.model;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.misc.OffsetToCell;
import org.architectdrone.archevo.pangea.implementation.universe.Universe;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UniverseModel {
    List<CellModel> cells;
    Integer size;
    Integer iterations;

    public UniverseModel(Universe universe)
    {
        cells = universe
                .getCellContainer()
                .getAllPositionsSafe()
                .stream()
                .map(cellPosition -> new CellModel(
                        cellPosition.x,
                        cellPosition.y,
                        cellPosition.cell,
                        universe.getUniverseSettings(),
                        getOffsetToCell(universe,
                                cellPosition.x,
                                cellPosition.y)))
                .collect(Collectors.toList());
        this.size = universe.getUniverseSettings().getSize();
        this.iterations = universe.getNumberOfIterations();
    }

    OffsetToCell getOffsetToCell(final Universe universe, final int x, final int y)
    {
        return (x_off, y_off) -> universe.getCellContainer().getSafe(x + x_off, y + y_off);
    }
}
