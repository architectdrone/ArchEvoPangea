package org.architectdrone.archevo.pangea.implementation.cellcontainer;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.SneakyThrows;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.exceptions.AlreadyLoadedException;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.exceptions.IntersectionException;

public class LinearContainer implements CellContainer {
    private List<CellPosition> all_cell_data;
    private final int size;
    public LinearContainer(Integer size) {
        all_cell_data = new ArrayList<>();
        this.size = size;
    }

    @Override
    public int getSize() {
        return size;
    }

    @Override
    public void set(final int x, final int y, final Cell cell) throws IntersectionException {
        int true_x = Math.floorMod(x, size);
        int true_y = Math.floorMod(y, size);
        if (all_cell_data.stream().noneMatch((a) -> a.x == true_x && a.y == true_y))
        {
            all_cell_data.add(new CellPosition(cell, true_x, true_y));
        }
        else
        {
            throw new IntersectionException();
        }

    }

    @Override
    public Cell get(final int x, final int y) {
        return get(x, y, false);
    }

    @Override
    public Cell getSafe(int x, int y) {
        return get(x, y, true);
    }

    private Cell get(int x, int y, boolean safe)
    {
        int true_x = Math.floorMod(x, size);
        int true_y = Math.floorMod(y, size);

        List<CellPosition> toStream;
        if (safe) {
            toStream = new ArrayList<>(all_cell_data);
        }
        else
        {
            toStream = all_cell_data;
        }

        List<CellPosition> matching_position = toStream.stream().filter((a) -> a.x == true_x && a.y == true_y).collect(Collectors.toList());
        if (matching_position.size() == 0)
        {
            return null;
        }
        else
        {
            return matching_position.get(0).cell;
        }
    }

    @Override
    public void delete(final int x, final int y) {
        all_cell_data = all_cell_data.stream().filter((a) -> !(a.x == x && a.y == y)).collect(Collectors.toList());
    }

    @Override
    public List<Cell> getAll() {
        List<CellPosition> copy = new ArrayList<>(all_cell_data);
        return copy.stream().map((a) -> a.cell).collect(Collectors.toList());
    }

    @Override
    public List<CellPosition> getAllPositions() {
        return all_cell_data;
    }

    @Override
    public void load(final List<CellPosition> cells) throws AlreadyLoadedException {
        if (all_cell_data.size() != 0)
        {
            throw new AlreadyLoadedException();
        }

        this.all_cell_data = cells.stream().map((a) -> new CellPosition(a.cell, Math.floorMod(a.x, size), Math.floorMod(a.y, size))).collect(Collectors.toList());
    }
}

