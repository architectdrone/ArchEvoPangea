import {React, useState, useEffect} from 'react';
import './App.css';
// eslint-disable-next-line max-len
import CellGridAndInformationDisplay from './components/CellGridAndInformationDisplay/CellGridAndInformationDisplay';
import WorldController from './components/WorldController/WorldController';
import './util/archevoApiWrapper';
import {getInformation, getState} from './util/archevoApiWrapper';

/**
 * The Root App.
 */
function App() {
  const [cells, setCells] = useState([]);
  useEffect(() => getState()
    .then((state) => setCells(state.cells))
    .then(console.log('Foo'))
      , []);
  getState().then((state) => setCells(state.cells));
  return (
    <>
      <WorldController
        startHandler={getInformation}
        stepHandler={getState}
        stopHandler={getState}
        currentServerState="LOL"/>
      <CellGridAndInformationDisplay cells={cells}/>
    </>
  );
}

export default App;
