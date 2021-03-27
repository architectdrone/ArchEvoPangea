import {React} from 'react';
import PropTypes from 'prop-types';
import {
    getWorldSize,
    getNumberOfOrganisms,
    getInfluxRate,
    getIterationCost,
    getInitialEnergy,
    getGreatestVirility,
    getLongestLineage,
    getGreatestAge,
    getIterations,
 } from '../../util/archEvo/objects/UniverseInformation';
import NumberOfOrganismsData from './NumberOfOrganismsData';
import GreatestVirilityData from './GreatestVirilityData';
import LongestLineageData from './LongestLineageData';
import GreatestAgeData from './GreatestAgeData';

/**
 * Displays general information about the world
 */
 function GeneralWorldInformationDisplay(props) {
    const {universeInformation} = props;

    const numberOfOrganisms = getNumberOfOrganisms(universeInformation);
    const greatestVirility = getGreatestVirility(universeInformation);
    const longestLineage = getLongestLineage(universeInformation);
    const greatestAge = getGreatestAge(universeInformation);

    const worldSize = getWorldSize(universeInformation);
    const influxRate = getInfluxRate(universeInformation);
    const iterationCost = getIterationCost(universeInformation);
    const initialEnergy = getInitialEnergy(universeInformation);
    const iterations = getIterations(universeInformation);
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
            <LongestLineageData
                longestLineage={longestLineage}
                iterations = {iterations} />
            <GreatestAgeData
                greatestAge={greatestAge}
                iterations = {iterations}/>
        </table>
    );
}

GeneralWorldInformationDisplay.propTypes = {
    universeInformation: PropTypes.object,
};

export default GeneralWorldInformationDisplay;
