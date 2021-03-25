/**
 *  Tools for parsing a Register object from the server.
 */

/**
 * Gets the value.
 */
function getValue(register) {
    return register.registerValue;
}

/**
 * Gets the register number.
 */
function getNumber(register) {
    return register.registerNumber;
}

/**
 * Gets the name.
 */
function getName(register) {
    return register.registerName;
}

export {
    getName,
    getValue,
    getNumber,
};
