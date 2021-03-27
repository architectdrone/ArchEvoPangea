import React from 'react';
import decimalToBinary from '../../util/decimalToBinary';
import PropTypes from 'prop-types';

/**
 * Displays the genome of the cell passed into it.
 */
function ProgramDisplay(props) {
  const {instructions, instructionPointer} = props;
  const instructionElements = [];
  for (let i = 0; i < 16; i++) {
    const {translatedInstruction, instruction} = instructions[i];

    instructionElements.push(
        <Instruction
          translatedInstruction={translatedInstruction}
          instruction={instruction}
          isCurrent={instructionPointer==i}
          number={i}/>,
    );
  }

  return (
    <table>
      {instructionElements}
    </table>
  );
}

/**
 * Displays a single instruction, in a table row.
 * Has an arrow next to it, if so.
 */
function Instruction(props) {
  const {translatedInstruction, instruction, number, isCurrent} = props;

  return (
    <tr>
      <td>{isCurrent ? '>' : ''}</td>
      <td>{number}</td>
      <td><b>{translatedInstruction}</b></td>
      <td>{decimalToBinary(instruction, 11)}</td>
    </tr>);
}

ProgramDisplay.propTypes = {
  // The number of the currently executed instruction. 0-indexed, of course.
  instructionPointer: PropTypes.number,
  // The instructions that make up the program.
  instructions: PropTypes.arrayOf(PropTypes.shape(
      {
        // The human-readable form of the instruction.
        translatedInstruction: PropTypes.string,
        // The machine-readable (binary) form of the instruction.
        instruction: PropTypes.number,
      },
  )),
};

Instruction.propTypes = {
  // See above.
  translatedInstruction: PropTypes.string,
  // See above.
  instruction: PropTypes.number,
  // The number of the instruction.
  number: PropTypes.number,
  // Whether or not the instruction is currently being executed.
  isCurrent: PropTypes.bool,
};
export default ProgramDisplay;
