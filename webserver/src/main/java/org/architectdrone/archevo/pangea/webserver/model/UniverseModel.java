package org.architectdrone.archevo.pangea.webserver.model;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
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
                    this.cells.add(new CellModel(x, y, result, universe.getUniverseSettings()));
            }
        }

        this.size = universe.getUniverseSettings().getSize();
        this.iterations = universe.getNumberOfIterations();    }
}
