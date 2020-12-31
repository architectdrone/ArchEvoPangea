import './App.css';
import WorldDisplay from './components/WorldDisplay/WorldDisplay';
import RegisterDisplay from './components/RegisterDisplay/RegisterDisplay';
import ProgramDisplay from './components/ProgramDisplay/ProgramDisplay';
function App() {
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
      name: 'ENERGY',
      value: 0,
    },
    {
      name: 'LOGO',
      value: 1,
    },
    {
      name: 'GUESS',
      value: 2,
    },
    {
      name: 'REG_A',
      value: 3,
    },
    {
      name: 'REG_B',
      value: 31,
    },
    {
      name: 'REG_C',
      value: 5,
    },
    {
      name: 'REG_D',
      value: 6,
    },
    {
      name: 'IPLOC',
      value: 7,
    },
    {
      name: 'I_ENERGY',
      value: 8,
    },
    {
      name: 'I_LOGO',
      value: 9,
    },
    {
      name: 'I_GUESS',
      value: 10,
    },
    {
      name: 'I_REG_A',
      value: 11,
    },
    {
      name: 'I_REG_B',
      value: 12,
    },
    {
      name: 'I_REG_C',
      value: 13,
    },
    {
      name: 'I_REG_D',
      value: 14,
    },
    {
      name: 'I_IPLOC',
      value: 15,
    },
  ];
  return (
    <div>
      <WorldDisplay cells={[{x: 1, y: 1}]} view_size={900} world_size={10}/>
      <RegisterDisplay registers={registers}/>
      <ProgramDisplay instructions={program} instructionPointer={3}/>
    </div>
  );
}

export default App;
