package org.architectdrone.archevo.pangea.implementation.action;

import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class DoNothing implements Action {
    @Override
    public boolean has_external_effect() {
        return false;
    }
}
