import {React, useState, useEffect} from 'react';
import './App.css';
// eslint-disable-next-line max-len
import CellGridAndInformationDisplay from './components/CellGridAndInformationDisplay/CellGridAndInformationDisplay';
import WorldController from './components/WorldController/WorldController';
import {getInformation,
  getState,
  startServer,
  stepServer,
  stopServer} from './util/archEvo/Wrapper';
import {getCells} from './util/archEvo/objects/Universe';
// eslint-disable-next-line max-len
import GeneralWorldInformationDisplay from './components/GeneralWorldInformationDisplay/GeneralWorldInformationDisplay';
import {getIterations,
   isServerRunning} from './util/archEvo/objects/UniverseInformation';

/**
 * These variables control the autoupdate functionality.
 * This is janky, but so is javascript. 🤷‍♂️
 */
let autoUpdate = false; // If general autoupdates occur

/**
 * Performs update
 * @param setUniverseInformation Sets the universe information.
 * @param setUniverseState Sets the universe state.
 */
function update(setUniverseInformation, setUniverseState, updateUniverseState) {
  getInformation()
  .then((information) => {
    autoUpdate = isServerRunning(information);
    setUniverseInformation(information);
  });
  if (updateUniverseState) {
    getState().then((state) => setUniverseState(state));
  }
}

/**
 * Does a thing and immediately updates information.
 * @param control The function to execute.
 * @param setUniverseInformation The universe setting function.
 */
function doAndUpdateInformation(control, setUniverseInformation) {
  control().then(update(setUniverseInformation, null, false));
}

/**
 * Does a thing and immediately updates information and state.
 * @param control The function to execute.
 * @param setUniverseInformation The universe setting function.
 */
 function doAndUpdateInformationAndState(
    control, setUniverseInformation, setUniverseState) {
  control().then(update(setUniverseInformation, setUniverseState, true));
}

/**
 * The Root App.
 */
function App() {
  const [universeInformation, setUniverseInformation] = useState({});
  const [universeState, setUniverseState] = useState({});

  useEffect(() => {
    update(setUniverseInformation, setUniverseState, true);
    setInterval(() => {
      if (autoUpdate) {
        update(setUniverseInformation, setUniverseState, true);
      }
    }, 1000);
  }, []);

  if (!universeState.cells) {
    return (
      <p>Loading....</p>
    );
  }
  return (
    <>
      <WorldController
        startHandler={
          () => doAndUpdateInformation(
            startServer, setUniverseInformation)}
        stepHandler={
          () => doAndUpdateInformationAndState(
            stepServer, setUniverseInformation, setUniverseState)}
        stopHandler={
          () => doAndUpdateInformation(stopServer, setUniverseInformation)}
        iterations={getIterations(universeInformation)}
        isRunning={isServerRunning(universeInformation)}
        currentServerState="LOL"/>
      <CellGridAndInformationDisplay cells={getCells(universeState)}/>
      <GeneralWorldInformationDisplay
        universeInformation={universeInformation}/>
    </>
  );
}

export default App;
