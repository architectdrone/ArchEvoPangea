import {React, useState, useEffect} from 'react';
import './App.css';
// eslint-disable-next-line max-len
import CellGridAndInformationDisplay from './components/CellGridAndInformationDisplay/CellGridAndInformationDisplay';
import WorldController from './components/WorldController/WorldController';
import {getInformation, getState} from './util/archEvo/Wrapper';
import {getInfluxRate, getWorldSize} from './util/archEvo/BasicInfo';

/**
 * The Root App.
 */
function App() {
  const [cells, setCells] = useState([]);
  const [size, setSize] = useState(0);
  const [influxRate, setInfluxRate] = useState(0);
  useEffect(() => getState()
    .then((state) => setCells(state.cells))
    .then(console.log('Foo'))
      , []);
  getWorldSize()
    .then((a) => setSize(a));
  getInfluxRate()
    .then((a) => setInfluxRate(a));
  return (
    <>
    <p>Size: {size}</p>
    <p>Influx: {influxRate}</p>
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
