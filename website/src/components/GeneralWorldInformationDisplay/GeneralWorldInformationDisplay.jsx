import {React} from 'react';
import PropTypes from 'prop-types';
import {
    getWorldSize,
    getNumberOfOrganisms,
    getInfluxRate,
    getIterationCost,
    getInitialEnergy,
 } from '../../util/archEvo/objects/UniverseInformation';
import NumberOfOrganismsData from './NumberOfOrganismsData';

/**
 * Displays general information about the world
 */
 function GeneralWorldInformationDisplay(props) {
    const {universeInformation} = props;

    const numberOfOrganisms = getNumberOfOrganisms(universeInformation);

    const worldSize = getWorldSize(universeInformation);
    const influxRate = getInfluxRate(universeInformation);
    const iterationCost = getIterationCost(universeInformation);
    const initialEnergy = getInitialEnergy(universeInformation);

    return (
        <table>
            <NumberOfOrganismsData
              numberOfOrganisms={numberOfOrganisms}
              worldSize={worldSize}
              influxRate={influxRate}
              iterationCost={iterationCost}
              initialEnergy={initialEnergy}
              />
        </table>
    );
}

GeneralWorldInformationDisplay.propTypes = {
    universeInformation: PropTypes.object,
};

export default GeneralWorldInformationDisplay;
