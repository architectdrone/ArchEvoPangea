package org.architectdrone.archevo.pangea.webserver.model;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.universe.Universe;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;

import java.util.List;

@Getter
public class UniverseModel {
    List<CellModel> cells;
    Integer size;
    Integer iterations;

    public UniverseModel(Universe universe, UniverseSettings universeSettings)
    {
        for (int x = 0; x < universeSettings.getSize(); x++)
        {
            for (int y = 0; y < universeSettings.getSize(); y++)
            {
                Cell result = universe.get(x, y);
                if (result != null)
                    this.cells.add(new CellModel(x, y, result, universeSettings));
            }
        }

        this.size = universeSettings.getSize();
        this.iterations = universe.getNumberOfIterations();    }
}
