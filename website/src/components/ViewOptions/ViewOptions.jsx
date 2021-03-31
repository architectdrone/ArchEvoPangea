import {React} from 'react';

/**
 * Options for controlling the view.
 */
function ViewOptions(props) {
    const {setViewType} = props;
    const setBlackAndWhite = () => setViewType(0);
    const setEnergy = () => setViewType(1);
    const setSpecies = () => setViewType(2);
    const setFamily = () => setViewType(3);
    return (
        <>
            <p>View Type:</p>
            <input type="radio" name="view" id="BAW"
                onClick={setBlackAndWhite}/>
            <label htmlFor="BAW">Black and White</label><br/>
            <input type="radio" name="view" id="Energy" onClick={setEnergy}/>
            <label htmlFor="Energy">Energy</label><br/>
            <input type="radio" name="view" id="Species" onClick={setSpecies}/>
            <label htmlFor="Species">Species</label><br/>
            <input type="radio" name="view" id="Family" onClick={setFamily}/>
            <label htmlFor="Family">Family</label><br/>
        </>
    );
}

ViewOptions.propTypes = {
    setViewType: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
export default ViewOptions;
