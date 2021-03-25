/**
 * Tools for parsing an Instruction object from the server.
 */

/**
 * Gets the translatedInstruction
 */
function getTranslatedInstruction(instruction) {
    return instruction.translatedInstruction;
}

/**
 * Gets the instruction, in binary
 */
function getInstruction(instruction) {
    return instruction.instruction;
}

export {
    getInstruction,
    getTranslatedInstruction,
};
