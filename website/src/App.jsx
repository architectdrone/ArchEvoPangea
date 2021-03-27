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

const autoUpdateUniverse = false;

/**
 * Performs update
 * @param setUniverseInformation Sets the universe information.
 * @param setUniverseState Sets the universe state.
 */
function update(setUniverseInformation, setUniverseState, updateUniverseState) {
  console.log("Sending request!");
  getInformation()
  .then((information) => setUniverseInformation(information))
  .then(console.log("Recieving request!"));
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
  control().then((a) => setUniverseInformation(a));
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
    // setInterval(() =>
    //   update(setUniverseInformation, setUniverseState, true), 1000);
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
