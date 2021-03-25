/**
 * Tools for parsing a Universe object from the server.
 */

/**
 * Gets the number of iterations
 */
function getIterations(universe) {
    return universe.iterations;
}

/**
 * Gets the size
 */
function getWorldSize(universe) {
    return universe.size;
}

/**
 * Gets the cells in the universe
 */
function getCells(universe) {
    return universe.cells;
}

export {
    getCells,
    getIterations,
    getWorldSize,
};
