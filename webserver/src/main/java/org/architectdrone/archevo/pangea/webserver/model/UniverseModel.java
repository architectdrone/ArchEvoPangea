package org.architectdrone.archevo.pangea.webserver.model;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.misc.OffsetToCell;
import org.architectdrone.archevo.pangea.implementation.universe.Universe;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;

import java.util.ArrayList;
import java.util.List;

@Getter
public class UniverseModel {
    List<CellModel> cells;
    Integer size;
    Integer iterations;

    public UniverseModel(Universe universe)
    {
        cells = new ArrayList<>();
        for (int x = 0; x < universe.getUniverseSettings().getSize(); x++)
        {
            for (int y = 0; y < universe.getUniverseSettings().getSize(); y++)
            {
                Cell result = universe.getCellContainer().get(x, y);
                if (result != null)
                {
                    OffsetToCell offsetToCell = getOffsetToCell(universe, x, y);
                    this.cells.add(new CellModel(x, y, result, universe.getUniverseSettings(), offsetToCell));
                }
            }
        }

        this.size = universe.getUniverseSettings().getSize();
        this.iterations = universe.getNumberOfIterations();
    }

    OffsetToCell getOffsetToCell(final Universe universe, final int x, final int y)
    {
        return (x_off, y_off) -> universe.get(x +x_off, y +y_off);
    }
}
