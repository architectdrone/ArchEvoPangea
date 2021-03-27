import {React} from 'react';
import PropTypes from 'prop-types';

/**
 * Has controls for starting, stopping, and stepping the simulation.
 */
function WorldController(props) {
    const {stepHandler,
        startHandler,
        stopHandler,
        currentServerState,
        isRunning,
        iterations} = props;

    const toggleServer = () => {
        if (isRunning) {
            stopHandler();
        } else {
            startHandler();
        }
    };

    let toggleLabel;
    let toggleFunction;
    if (isRunning) {
        toggleLabel = '⏸';
        toggleFunction = stopHandler;
    } else {
        toggleLabel = '▶';
        toggleFunction = startHandler;
    };

    return (
        <div>
            <button
                onClick={() => stepHandler()}
                disabled={isRunning}>
                    Step
            </button>
            <button onClick={() => toggleFunction()}>{toggleLabel}</button>
            | Iterations: {iterations}
        </div>
    );
}

WorldController.propTypes = {
    stepHandler: PropTypes.func.isRequired,
    startHandler: PropTypes.func.isRequired,
    stopHandler: PropTypes.func.isRequired,
    currentServerState: PropTypes.string.isRequired,
    isRunning: PropTypes.bool.isRequired,
    iterations: PropTypes.number.isRequired,
};

export default WorldController;
