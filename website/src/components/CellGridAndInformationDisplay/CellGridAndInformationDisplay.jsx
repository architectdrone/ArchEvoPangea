import {React, useState} from 'react';
import CellGridDisplay from '../CellGridDisplay/CellGridDisplay';
import PropTypes from 'prop-types';
import CellDisplay from '../CellDisplay/CellDisplay';

/**
 * Shows a grid of cells.
 * When clicked on, shows some basic information about the cell.
 */
function CellGridAndInformationDisplay(props) {
  const {cells} = props;
  const [cellIdToDisplay, setCellIdToDisplay] = useState(null);

  let cellToDisplay = null;
  if (cellIdToDisplay !== null) {
    // eslint-disable-next-line react/prop-types
    const matchingCells = cells.filter((cell) => cell.id === cellIdToDisplay);
    if (matchingCells.length == 1) {
      cellToDisplay = matchingCells[0];
    } else {
      cellToDisplay = null;
      cellIdToDisplay = null;
    }
  }

  const onClick = (cell) => {
    if (cell !== null) {
      setCellIdToDisplay(cell.id);
    }
  };
  return (
    <div
      className="flex-container"
      style={{'flex-direction': 'row', 'display': 'flex'}}>
      <CellGridDisplay
        cells={cells}
        viewSize={900}
        worldSize={64}
        onClick={onClick}/>
      <CellDisplay cell={cellToDisplay}/>
    </div>
  );
}

CellGridAndInformationDisplay.propTypes = {
  // Cells to display.
  cells: PropTypes.arrayOf(
      PropTypes.shape(
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
  ).isRequired,
};

export default CellGridAndInformationDisplay;
