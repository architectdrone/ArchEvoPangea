/**
 * Tools for parsing a UniverseInformation object from the server.
 */

/**
 * Gets the name of the ISA.
 */
 function getISA(universeInformation) {
    return universeInformation.ISA;
}

/**
 * Gets the name of the iteration exeuction mode.
 */
 function getIterationExecutionMode(universeInformation) {
    return universeInformation.iterationExecutionMode;
}

/**
 * Gets the name of the combat handler.
 */
 function getCombatHandler(universeInformation) {
    return universeInformation.combatHandler;
}

/**
 * Gets the name of the reproductionHandler.
 */
 function getReproductionHandler(universeInformation) {
    return universeInformation.reproductionHandler;
}

/**
 * Gets the mutationChance.
 */
 function getMutationChance(universeInformation) {
    return universeInformation.mutationChance;
}

/**
 * Gets the world size
 */
 function getWorldSize(universeInformation) {
    return universeInformation.size;
}

/**
 * Gets the influx rate.
 */
function getInfluxRate(universeInformation) {
    return universeInformation.influxRate;
}

/**
 * Gets the move cost.
 */
 function getMoveCost(universeInformation) {
    return universeInformation.moveCost;
}

/**
 * Gets the iteration cost.
 */
 function getIterationCost(universeInformation) {
    return universeInformation.iterationCost;
}

/**
 * Gets the initial energy.
 */
function getInitialEnergy(universeInformation) {
    return universeInformation.initialEnergy;
}

/**
 * Gets the number of genes in a cell.
 */
 function getNumberOfGenes(universeInformation) {
    return universeInformation.numberOfGenes;
}

/**
 * Gets the number of iterations
 */
function getIterations(universeInformation) {
    return universeInformation.iterations;
}


/**
 * Gets the number of organisms
 */
function getNumberOfOrganisms(universeInformation) {
    return universeInformation.numberOfOrganisms;
}

/**
 * Gets the average age.
 */
function getAverageAge(universeInformation) {
    return universeInformation.averageAge;
}

/**
 * Gets the greatest age.
 */
function getGreatestAge(universeInformation) {
    return universeInformation.greatestAge;
}

/**
 * Gets the greatest virility.
 */
function getGreatestVirility(universeInformation) {
    return universeInformation.greatestVirility;
}

/**
 * Gets the longest lineage.
 */
function getLongestLineage(universeInformation) {
    return universeInformation.greatestLineage;
}

/**
 * Returns whether or not the server is running.
 */
function isServerRunning(universeInformation) {
    return universeInformation.isRunning;
}

export {
    getInitialEnergy,
    getNumberOfGenes,
    getWorldSize,
    getInfluxRate,
    getMoveCost,
    getIterationCost,
    getIterationExecutionMode,
    getMutationChance,
    getISA,
    getCombatHandler,
    getReproductionHandler,
    getIterations,
    getNumberOfOrganisms,
    getAverageAge,
    getGreatestAge,
    getGreatestVirility,
    getLongestLineage,
    isServerRunning,
};
