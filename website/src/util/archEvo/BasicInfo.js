import {getInformation} from './Wrapper';
/**
 * This provides accessors for information about the world that doesn't change.
 * It uses a fairly dumb caching system that works well enough for my purposes.
 * The first time any information is requested, a request is made.
 * From then on, the cached information is used.
 */

// Stores whether or not an initial request has been made.
let basicInfoIsPopulated = false;
// Stores the cached information.
let basicInfo = {};

/**
 * Get basic info about the server
 */
function getBasicInfo() {
    if (basicInfoIsPopulated) {
        return Promise.resolve(basicInfo);
    } else {
        basicInfoIsPopulated = true;
        return getInformation().then((information) => {
            basicInfo = information;
            return information;
        });
    }
}

/**
 * Gets the name of the ISA.
 */
function getISA() {
    return getBasicInfo().then((info) => info.ISA);
}

/**
 * Gets the name of the iteration exeuction mode.
 */
 function getIterationExecutionMode() {
    return getBasicInfo().then((info) => info.iterationExecutionMode);
}

/**
 * Gets the name of the combat handler.
 */
 function getCombatHandler() {
    return getBasicInfo().then((info) => info.combatHandler);
}

/**
 * Gets the name of the reproductionHandler.
 */
 function getReproductionHandler() {
    return getBasicInfo().then((info) => info.reproductionHandler);
}

/**
 * Gets the mutationChance.
 */
 function getMutationChance() {
    return getBasicInfo().then((info) => info.mutationChance);
}

/**
 * Gets the world size
 */
 function getWorldSize() {
    return getBasicInfo().then((info) => info.size);
}

/**
 * Gets the influx rate.
 */
function getInfluxRate() {
    return getBasicInfo().then((info) => info.influxRate);
}

/**
 * Gets the move cost.
 */
 function getMoveCost() {
    return getBasicInfo().then((info) => info.moveCost);
}

/**
 * Gets the iteration cost.
 */
 function getIterationCost() {
    return getBasicInfo().then((info) => info.iterationCost);
}

/**
 * Gets the initial energy.
 */
function getInitialEnergy() {
    return getBasicInfo().then((info) => info.initialEnergy);
}

/**
 * Gets the number of genes in a cell.
 */
 function getNumberOfGenes() {
    return getBasicInfo().then((info) => info.numberOfGenes);
}

/**
 * Gets the seed.
 */
function getSeed() {
    return getBasicInfo().then((info) => info.seed);
}
export {
    getISA,
    getIterationExecutionMode,
    getCombatHandler,
    getReproductionHandler,
    getMutationChance,
    getWorldSize,
    getInfluxRate,
    getMoveCost,
    getIterationCost,
    getInitialEnergy,
    getNumberOfGenes,
    getSeed,
};
