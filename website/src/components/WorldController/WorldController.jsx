import {React} from 'react';
import PropTypes from 'prop-types';

/**
 * Has controls for starting, stopping, and stepping the simulation.
 */
function WorldController(props) {
    const {stepHandler, startHandler, stopHandler, currentServerState} = props;

    return (
        <div>
            <p>{currentServerState}</p>
            <button onClick={() => stepHandler()}>Step</button>
            <button onClick={() => startHandler()}>Start</button>
            <button onClick={() => stopHandler()}>Stop</button>
        </div>
    );
}

WorldController.propTypes = {
    stepHandler: PropTypes.func.isRequired,
    startHandler: PropTypes.func.isRequired,
    stopHandler: PropTypes.func.isRequired,
    currentServerState: PropTypes.string.isRequired,
};

export default WorldController;
