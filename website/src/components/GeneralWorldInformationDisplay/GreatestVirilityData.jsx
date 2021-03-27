import {React} from 'react';
import PropTypes from 'prop-types';

/**
 * Table row about number of organisms.
 */
 function GreatestVirilityData(props) {
    const {greatestVirility} = props;

    return (
        <tr>
            <td>
                Greatest Virility
            </td>
            <td>
                {greatestVirility}
            </td>
            <td>
                No additional calculations.
            </td>
        </tr>
    );
}

GreatestVirilityData.propTypes = {
    greatestVirility: PropTypes.number,
};

export default GreatestVirilityData;
