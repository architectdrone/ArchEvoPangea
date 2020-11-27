package org.architectdrone.archevo.pangea.implementation.action;

import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class Attack extends PositionalAction {
    public Attack(int x_offset, int y_offset) {
        super(x_offset, y_offset);
    }
}
