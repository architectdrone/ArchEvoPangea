package org.architectdrone.archevo.pangea.implementation.cellcontainer;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import lombok.EqualsAndHashCode;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.exceptions.AlreadyLoadedException;
import org.architectdrone.archevo.pangea.implementation.cellcontainer.exceptions.IntersectionException;

public class HashContainer implements CellContainer {

    private HashMap<Coordinate, Cell> entries;
    private boolean cells_are_loaded = false;
    private final int size;
    private static Exception exception_to_throw = new Exception("Uh oh");
    public HashContainer(Integer size)
    {
        this.size = size;
        entries = new HashMap<>();
    }

    @Override
    public int getSize() {
        return size;
    }

    @Override
    public void set(final int x, final int y, final Cell cell) throws IntersectionException {
        int true_x = Math.floorMod(x, size);
        int true_y = Math.floorMod(y, size);

        cells_are_loaded = true;
        if (entries.get(new Coordinate(true_x, true_y)) != null)
        {
            throw new IntersectionException();
        }

        Coordinate coordinate = new Coordinate(true_x, true_y);
        entries.put(coordinate, cell);

    }

    @Override
    public Cell get(final int x, final int y) {
        int true_x = Math.floorMod(x, size);
        int true_y = Math.floorMod(y, size);
        return entries.get(new Coordinate(true_x, true_y));
    }

    @Override
    public Cell getSafe(int x, int y) {
        return get(x, y); //What could go wrong :3
    }

    @Override
    public void delete(final int x, final int y) {
        int true_x = Math.floorMod(x, size);
        int true_y = Math.floorMod(y, size);
        entries.remove(new Coordinate(true_x, true_y));
    }

    @Override
    public List<Cell> getAll() {
        return entries.entrySet().stream().map((a) -> a.getValue()).collect(Collectors.toList());
    }

    @Override
    public List<CellPosition> getAllPositions() {
        return entries.entrySet().stream().map((a) -> new CellPosition(a.getValue(), a.getKey().x, a.getKey().y)).collect(Collectors.toList());
    }

    @Override
    public List<CellPosition> getAllPositionsSafe() {
        return getAllPositions(); //Again, what could go wrong? :3
    }

    @Override
    public void load(final List<CellPosition> cells) throws AlreadyLoadedException {
        if (cells_are_loaded)
        {
            throw new AlreadyLoadedException();
        }
        cells_are_loaded = true;
        cells.forEach((a) -> entries.put(new Coordinate(a.x, a.y), a.cell));
    }
}

@EqualsAndHashCode
class Coordinate {
    public int x;
    public int y;

    public Coordinate(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}
