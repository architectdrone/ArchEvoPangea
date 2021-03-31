import React from 'react';
import PropTypes from 'prop-types';

import './CellGridDisplay.css';
import {getEnergy,
  getId,
  getParentId,
  getSpeciesH,
  getSpeciesS,
  getSpeciesV} from '../../util/archEvo/objects/Cell';
import {pow, floor} from 'mathjs';

/**
 * Displays a 2D grid of cells in the world.
 */
function CellGridDisplay(props) {
  const {cells, viewSize, worldSize, onClick, colorMode} = props;

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

      let cellElement;
      if (cell !== null) {
        let color;
        if (colorMode == 0) { // Basic
          color = {r: 0, g: 0, b: 0, rgb: true};
        } else if (colorMode == 1) { // Energy
          color = {r: 0, g: getEnergy(cell), b: 0, rgb: true};
        } else if (colorMode == 2) { // Species
          color = {h: getSpeciesH(cell),
            s: getSpeciesS(cell),
            v: getSpeciesV(cell), rgb: false};
        } else if (colorMode == 3) { // Family
          if (getParentId(cell) == -1) {
            color = {r: 0, g: 0, b: 0, rgb: true};
          } else {
            let parentId = getParentId(cell);
            let isGrandparent = true;
            // Get grandparent
            while (true) {
              const parentCell = findCellById(parentId, cells);
              if (parentCell === null) {
                break;
              } else {
                isGrandparent = false;
                parentId = getParentId(parentCell);
              }
            }

            if (isGrandparent && !findCellByParentId(getId(cell), cells)) {
              // If no living parent, and no living children, color black.
              color = {r: 0, g: 0, b: 0, rgb: true};
            } else {
              const r = floor(getDigit(parentId, 0)*(256/10));
              const g = floor(getDigit(parentId, 1)*(256/10));
              const b = floor(getDigit(parentId, 2)*(256/10));
              color = {r: r, g: g, b: b, rgb: true};
            };
          }
        }
        cellElement = <Cell
          x={x}
          y={y}
          size={cellSize}
          color={color}
          filled={true}
          onClick={specificOnClick}
        />;
      } else {
        cellElement = <Cell
          x={x}
          y={y}
          size={cellSize}
          filled={false}
          onClick={specificOnClick}
        />;
      }
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
 * Gets a digit of a number.
 */
function getDigit(number, digitNumber) {
  const modulus = pow(10, digitNumber+1);
  const divisor = pow(10, digitNumber);
  return floor((number % modulus)/divisor);
}

/**
 * A single rectangle, representing a cell.
 */
function Cell(props) {
  const {x, y, size, filled, onClick, color} = props;
  const trueX = x*size;
  const trueY = y*size;

  let fillColor;
  if (!filled) {
    fillColor = 'rgb(255,255,255)';
  } else {
    if (color.rgb) {
      fillColor = 'rgb('+color.r+','+color.g+','+color.b+')';
    } else {
      const sPercent = ((color.s)/255)*100;
      const vPercent = ((color.v)/255)*100;
      fillColor = 'hsl('+color.h+','+sPercent+'%,'+vPercent+'%)';
    }
  }

  return (<rect
    className='box'
    style={{fill: fillColor}}
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

/**
 * Finds a cell in an unsorted array of cells.
 * @param {number} id the id
 * @param {Array} cells The array of cells.
 */
 function findCellById(id, cells) {
  const result = cells.filter((cell) => getId(cell) === id);
  if (result.length === 1) {
    return result[0];
  } else {
    return null;
  }
}

/**
 * Finds a cell in an unsorted array of cells with the given parent id.
 * @param {number} parentId the parentId
 * @param {Array} cells The array of cells.
 */
 function findCellByParentId(parentId, cells) {
  const result = cells.filter((cell) => getParentId(cell) === parentId);
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
  // Defines how colors are rendered. Possible values are:
  // 0 - Basic
  // 1 - Energy
  colorMode: PropTypes.number.isRequired,
};

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  filled: PropTypes.bool,
  color: PropTypes.object,
};

export default CellGridDisplay;
