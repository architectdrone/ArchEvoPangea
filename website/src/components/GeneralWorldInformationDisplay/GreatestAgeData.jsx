import {React} from 'react';
import PropTypes from 'prop-types';
import {round} from 'mathjs';
/**
 * Table row about lineage.
 */
 function GreatestAgeData(props) {
    const {greatestAge,
    iterations} = props;

    /**
     * What percent of the simulation the cell has seen.
     */
    const percentageOfSimulation = round((greatestAge/iterations)*100, 1);
    return (
        <tr>
            <td>
                Greatest Age
            </td>
            <td>
                {greatestAge}
            </td>
            <td>
                <table>
                    <tr>
                        <td>Percentage of Simulation</td>
                        <td>{percentageOfSimulation}%</td>
                    </tr>
                </table>
            </td>
        </tr>
    );
}

GreatestAgeData.propTypes = {
    greatestAge: PropTypes.number.isRequired,
    iterations: PropTypes.number.isRequired,
};

export default GreatestAgeData;
