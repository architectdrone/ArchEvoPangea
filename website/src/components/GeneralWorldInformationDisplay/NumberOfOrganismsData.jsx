import {React} from 'react';
import {round} from 'mathjs';
import PropTypes from 'prop-types';

/**
 * Table row about number of organisms.
 */
 function NumberOfOrganismsData(props) {
    const {numberOfOrganisms,
        worldSize,
        influxRate,
        iterationCost,
        initialEnergy} = props;

    /**
     * What percent of the maximum number of cells there are.
     */
    const saturation = round(
        (numberOfOrganisms / (worldSize*worldSize)) * 100
        , 1);

    /**
     * Static population is the size of the population,
     * if every cell does nothing, and simply waits to die.
     * In this circumstance, the population is static.
     * This is because influx rate = rate of death.
     *
     * The calculation is (initialEnergy / iterationCost) * influxRate.
     * The inner equation is the lifespan of a cell.
     * If the IR is 1, then there is exactly one cell at each age.
     *
     * The population cannot be static if the IR is 0.
     */
    let staticPopulationSize;
    let staticPopulationSizePercentage;
    if (iterationCost == 0) {
        staticPopulationSize = 'N/A';
        staticPopulationSizePercentage = 'N/A';
    } else {
        staticPopulationSize = (initialEnergy / iterationCost) * influxRate;
        staticPopulationSizePercentage = round(
            (numberOfOrganisms / staticPopulationSize) * 100
            , 1);
    }

    return (
        <tr>
            <td>
                Number of Organisms
            </td>
            <td>
                {numberOfOrganisms}
            </td>
            <td>
                <table>
                    <tr><td>Saturation</td><td>{saturation}%</td></tr>
                    <tr>
                        <td>Static Population Size Percentage</td>
                        <td>{staticPopulationSizePercentage}%</td>
                    </tr>
                    <tr>
                        <td>Static Population Size</td>
                        <td>{staticPopulationSize}</td>
                    </tr>
                </table>
            </td>
        </tr>
    );
}

NumberOfOrganismsData.propTypes = {
    numberOfOrganisms: PropTypes.number,
    worldSize: PropTypes.number,
    influxRate: PropTypes.number,
    iterationCost: PropTypes.number,
    initialEnergy: PropTypes.number,
};

export default NumberOfOrganismsData;
