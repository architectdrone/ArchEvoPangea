import React from 'react';
import PropTypes from 'prop-types';

import './CellGridDisplay.css';

/**
 * Displays a 2D grid of cells in the world.
 */
function CellGridDisplay(props) {
  const {cells, viewSize, worldSize, onClick} = props;

  const cellSize = viewSize/worldSize;

  const cellElements = [];
  for (let x = 0; x < worldSize; x++) {
    for (let y = 0; y < worldSize; y++) {
      const cell = findCell(x, y, cells);
      const specificOnClick = () => {
        if (onClick !== null) {
          onClick(cell);
        }
      };
      const cellElement = <Cell
        x={x}
        y={y}
        size={cellSize}
        filled={cell !== null}
        onClick={specificOnClick}
      />;
      cellElements.push(cellElement);
    }
  }

  return (
    <svg width={viewSize} height={viewSize}>
      {cellElements}
    </svg>
  );
}

/**
 * A single rectangle, representing a cell.
 */
function Cell(props) {
  const {x, y, size, filled, onClick} = props;
  const trueX = x*size;
  const trueY = y*size;
  return (<rect
    className={filled?'filled':'empty'}
    x={trueX}
    y={trueY}
    width={size}
    height={size}
    onClick={() => onClick()}/>);
}

/**
 * Finds a cell in an unsorted array of cells.
 * @param {number} x The x coordinate.
 * @param {number} y The y coordinate.
 * @param {Array} cells The array of cells.
 */
function findCell(x, y, cells) {
  const result = cells.filter((cell) => cell.x === x && cell.y === y);
  if (result.length === 1) {
    return result[0];
  } else {
    return null;
  }
}

CellGridDisplay.propTypes = {
  // Cells to display.
  cells: PropTypes.arrayOf(
      PropTypes.shape(
          {
            // X Position of the Cell
            x: PropTypes.number.isRequired,
            // Y Position of the Cell
            y: PropTypes.number.isRequired,
          },
      ),
  ).isRequired,
  // Size, in px, of the grid.
  viewSize: PropTypes.number.isRequired,
  // Size, in cells, of the world.
  worldSize: PropTypes.number.isRequired,
  // Click handler. Takes in a cell.
  onClick: PropTypes.func,
};

Cell.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  filled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default CellGridDisplay;
