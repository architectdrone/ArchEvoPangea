package org.architectdrone.archevo.pangea.implementation.combathandler;

import org.architectdrone.archevo.pangea.implementation.cell.Cell;

public interface CombatHandler {
    public CombatResult getResult(Cell attacker, Cell defender);
}
