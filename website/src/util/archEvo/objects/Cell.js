/**
 * Tools for parsing a Cell object from the server.
 */

/**
 * Gets the location of the instruction pointer
 */
function getInstructionPointer(cell) {
    return cell.instructionPointer;
}

/**
 * Gets the registers.
 */
function getRegisters(cell) {
    return cell.registers;
}

/**
 * Gets the amount of energy it has.
 */
function getEnergy(cell) {
    return getRegisters(cell)[0].registerValue;
}

/**
 * Gets the genome.
 */
function getGenome(cell) {
    return cell.genome;
}

/**
 * Gets the x coordinate.
 */
function getX(cell) {
    return cell.x;
}

/**
 * Gets the y coordinate
 */
function getY(cell) {
    return cell.y;
}

/**
 * Gets the id.
 */
function getId(cell) {
    return cell.id;
}

/**
 * Gets the age.
 */
function getAge(cell) {
    return cell.age;
}

/**
 * Gets the lineage
 */
function getLineage(cell) {
    return cell.lineage;
}

/**
 * Gets the virility
 */
function getVirility(cell) {
    return cell.virility;
}

export {
    getInstructionPointer,
    getRegisters,
    getGenome,
    getX,
    getY,
    getId,
    getAge,
    getLineage,
    getEnergy,
    getVirility,
};
