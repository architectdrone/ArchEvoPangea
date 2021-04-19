package org.architectdrone.archevo.pangea.implementation.action;

import lombok.EqualsAndHashCode;

/**
 * The same as DoNothing, but with simulated external effect. This doesn't break the paradigm of stateful actions being caused by things like REPRODUCE or ATTACK, even when the commands don't make sense (ie, attack self)
 */
@EqualsAndHashCode
public class ExternalDoNothing implements Action {
    @Override
    public boolean has_external_effect() {
        return true;
    }
}
