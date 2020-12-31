import React from 'react';
import PropTypes from 'prop-types';

import './WorldDisplay.css';

/**
 * Displays a 2D grid of cells in the world.
 */
function WorldDisplay(props) {
  const {cells, viewSize, worldSize} = props;

  const cellSize = viewSize/worldSize;

  const cellElements = [];
  for (let x = 0; x < worldSize; x++) {
    for (let y = 0; y < worldSize; y++) {
      const cell = findCell(x, y, cells);
      const cellElement = <Cell
        x={x}
        y={y}
        size={cellSize}
        filled={cell !== null}/>;
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
  const {x, y, size, filled} = props;
  const trueX = x*size;
  const trueY = y*size;
  return (<rect
    className={filled?'filled':'empty'}
    x={trueX}
    y={trueY}
    width={size}
    height={size}
    onClick={() => console.log('Looking at '+x+','+y)}/>);
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

WorldDisplay.propTypes = {
  // Cells to display.
  cells: PropTypes.arrayOf(
      PropTypes.shape(
          {
            // X Position of the Cell
            x: PropTypes.number,
            // Y Position of the Cell
            y: PropTypes.number,
          },
      ),
  ),
  // Size, in px, of the grid.
  viewSize: PropTypes.number,
  // Size, in cells, of the world.
  worldSize: PropTypes.number,
};

Cell.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  filled: PropTypes.bool,
};

export default WorldDisplay;
