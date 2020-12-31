import PropTypes from 'prop-types';
import React from 'react';
import ProgramDisplay from '../ProgramDisplay/ProgramDisplay';
import RegisterDisplay from '../RegisterDisplay/RegisterDisplay';
/**
 * Shows information about a cell.
 * Displays registers, instructions, and misc information.
 */
function CellDisplay(props) {
  const {cell} = props;
  if (cell === null) {
    return <h2>Select a cell!</h2>;
  }
  return <div className="flex-container">
    <h2>Cell #{cell.id}</h2>
    <p>Age: {cell.age}</p>
    <p>Virility: {cell.virility}</p>
    <p>Lineage: {cell.lineage}</p>
    <RegisterDisplay registers={cell.registers}/>
    <ProgramDisplay
      instructionPointer={cell.instructionPointer}
      instructions={cell.genome}/>
  </div>;
}

CellDisplay.propTypes = {
  // The cell to display
  cell: PropTypes.shape(
      {
        // The X Coordinate of the cell
        x: PropTypes.number.isRequired,
        // The Y Coordinate of the cell
        y: PropTypes.number.isRequired,
        // The number of the next instruction to be executed in genome.
        instructionPointer: PropTypes.number.isRequired,
        // The ID of the Cell.
        id: PropTypes.number.isRequired,
        // The age of the Cell.
        age: PropTypes.number.isRequired,
        // The length of the cell's lineage
        lineage: PropTypes.number.isRequired,
        // How many children the cell has.
        virility: PropTypes.number.isRequired,
        // The cell's registers.
        registers: PropTypes.arrayOf(
            PropTypes.shape(
                {
                  // The name of the register.
                  registerName: PropTypes.string.isRequired,
                  // The stored value in that register.
                  registerValue: PropTypes.number.isRequired,
                },
            ),
        ),
        // The genome of the cell.
        genome: PropTypes.arrayOf(
            PropTypes.shape(
                {
                  // The computer-readable instruction.
                  instruction: PropTypes.number.isRequired,
                  // The human-readable instruction.
                  translatedInstruction: PropTypes.string.isRequired,
                },
            ),
        ),
      },
  ),
};

export default CellDisplay;
