package org.architectdrone.archevo.pangea.implementation.misc;

import org.architectdrone.archevo.pangea.implementation.cell.Cell;

@FunctionalInterface
public interface OffsetToCell {
    public Cell f(int x, int y);
}
