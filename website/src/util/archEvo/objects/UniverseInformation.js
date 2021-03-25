/**
 * Tools for parsing a UniverseInformation object from the server.
 */

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
    return universeInformation.organisms;
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
    getIterations,
    getNumberOfOrganisms,
    getAverageAge,
    getGreatestAge,
    getGreatestVirility,
    getLongestLineage,
    isServerRunning,
};
