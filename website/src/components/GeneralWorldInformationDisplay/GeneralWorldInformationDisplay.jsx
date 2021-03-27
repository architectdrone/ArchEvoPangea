import {React} from 'react';
import PropTypes from 'prop-types';
import {
    getWorldSize,
    getNumberOfOrganisms,
    getInfluxRate,
    getIterationCost,
    getInitialEnergy,
    getGreatestVirility,
 } from '../../util/archEvo/objects/UniverseInformation';
import NumberOfOrganismsData from './NumberOfOrganismsData';
import GreatestVirilityData from './GreatestVirilityData';

/**
 * Displays general information about the world
 */
 function GeneralWorldInformationDisplay(props) {
    const {universeInformation} = props;

    const numberOfOrganisms = getNumberOfOrganisms(universeInformation);
    const greatestVirility = getGreatestVirility(universeInformation);

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
            <GreatestVirilityData greatestVirility={greatestVirility}/>
        </table>
    );
}

GeneralWorldInformationDisplay.propTypes = {
    universeInformation: PropTypes.object,
};

export default GeneralWorldInformationDisplay;
