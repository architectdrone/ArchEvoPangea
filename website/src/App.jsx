import {React, useState, useEffect} from 'react';
import './App.css';
// eslint-disable-next-line max-len
import CellGridAndInformationDisplay from './components/CellGridAndInformationDisplay/CellGridAndInformationDisplay';
import WorldController from './components/WorldController/WorldController';
import {getInformation, getState} from './util/archEvo/Wrapper';
import {getCells} from './util/archEvo/objects/Universe';
// eslint-disable-next-line max-len
import GeneralWorldInformationDisplay from './components/GeneralWorldInformationDisplay/GeneralWorldInformationDisplay';

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
 * The Root App.
 */
function App() {
  const [universeInformation, setUniverseInformation] = useState({});
  const [universeState, setUniverseState] = useState({});
  useEffect(() => {
    update(setUniverseInformation, setUniverseState, true);
    setInterval(() =>
      update(setUniverseInformation, setUniverseState, true), 1000);
  }, []);

  if (!universeState.cells) {
    return (
      <p>Loading....</p>
    );
  }
  return (
    <>
      <WorldController
        startHandler={getInformation}
        stepHandler={getState}
        stopHandler={getState}
        currentServerState="LOL"/>
      <CellGridAndInformationDisplay cells={getCells(universeState)}/>
      <GeneralWorldInformationDisplay
        universeInformation={universeInformation}/>
    </>
  );
}

export default App;
