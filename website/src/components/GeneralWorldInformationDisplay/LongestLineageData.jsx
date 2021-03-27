import {React} from 'react';
import PropTypes from 'prop-types';
import {round} from 'mathjs';
/**
 * Table row about lineage.
 */
 function LongestLineageData(props) {
    const {longestLineage,
    iterations} = props;

    const iterationsPerGeneation = round(iterations / longestLineage, 1);
    return (
        <tr>
            <td>
                Longest Lineage
            </td>
            <td>
                {longestLineage}
            </td>
            <td>
                <table>
                    <tr>
                        <td>Iterations per Generation</td>
                        <td>{iterationsPerGeneation}</td>
                    </tr>
                </table>
            </td>
        </tr>
    );
}

LongestLineageData.propTypes = {
    longestLineage: PropTypes.number.isRequired,
    iterations: PropTypes.number.isRequired,
};

export default LongestLineageData;
