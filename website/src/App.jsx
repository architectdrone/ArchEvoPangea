import {React, useState} from 'react';
import './App.css';
import CellGridDisplay from './components/CellGridDisplay/CellGridDisplay';
import CellDisplay from './components/CellDisplay/CellDisplay';

const program = [
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 42,
    translatedInstruction: 'Boogaloo',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
  {
    instruction: 0,
    translatedInstruction: 'DO NOTHING',
  },
];

const registers = [
  {
    registerName: 'ENERGY',
    registerValue: 0,
  },
  {
    registerName: 'LOGO',
    registerValue: 1,
  },
  {
    registerName: 'GUESS',
    registerValue: 2,
  },
  {
    registerName: 'REG_A',
    registerValue: 3,
  },
  {
    registerName: 'REG_B',
    registerValue: 31,
  },
  {
    registerName: 'REG_C',
    registerValue: 5,
  },
  {
    registerName: 'REG_D',
    registerValue: 6,
  },
  {
    registerName: 'IPLOC',
    registerValue: 7,
  },
  {
    registerName: 'I_ENERGY',
    registerValue: 8,
  },
  {
    registerName: 'I_LOGO',
    registerValue: 9,
  },
  {
    registerName: 'I_GUESS',
    registerValue: 10,
  },
  {
    registerName: 'I_REG_A',
    registerValue: 11,
  },
  {
    registerName: 'I_REG_B',
    registerValue: 12,
  },
  {
    registerName: 'I_REG_C',
    registerValue: 13,
  },
  {
    registerName: 'I_REG_D',
    registerValue: 14,
  },
  {
    registerName: 'I_IPLOC',
    registerValue: 15,
  },
];

const cell = {
  x: 5,
  y: 5,
  instructionPointer: 4,
  id: 69420,
  age: 30,
  lineage: 3,
  virility: 5,
  registers: registers,
  genome: program,
};

const cell2 = {
  x: 1,
  y: 2,
  instructionPointer: 4,
  id: 777,
  age: 30,
  lineage: 3,
  virility: 5,
  registers: registers,
  genome: program,
};

/**
 * The Root App.
 */
function App() {
  const [cellToDisplay, setCellToDisplay] = useState(null);

  const onClick = (cell) => {
    setCellToDisplay(cell);
  };
  return (
    <div
      className="flex-container"
      style={{'flex-direction': 'row', 'display': 'flex'}}>
      <CellGridDisplay
        cells={[cell, cell2]}
        viewSize={900}
        worldSize={10}
        onClick={onClick}/>
      <CellDisplay cell={cellToDisplay}/>
    </div>
  );
}

export default App;
