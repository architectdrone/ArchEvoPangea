import React from 'react';
import PropTypes from 'prop-types';

import './CellGridDisplay.css';
import {getEnergy,
  getId,
  getParentId,
  getSpeciesH,
  getSpeciesS,
  getSpeciesV,
  getIploc} from '../../util/archEvo/objects/Cell';
import {pow, floor, round} from 'mathjs';

/**
 * Displays a 2D grid of cells in the world.
 */
function CellGridDisplay(props) {
  const {cells,
    viewSize,
    worldSize,
    onClick,
    colorMode,
    highlightCellId} = props;

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
          const h = getSpeciesH(cell);
          const s = getSpeciesS(cell);
          const v = getSpeciesV(cell);
          if ( h == -1 || s == -1 || v == -1) {
            color = {h: 0, s: 0, v: 0, rgb: false, noNorm: true};
          } else {
            color = {h: h, s: s, v: v, rgb: false, noNorm: false};
          }
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
          key={(((x+y)*(x+y+1))/2)+y}
          pointX={iplocToXOffset(getIploc(cell))}
          pointY={iplocToYOffset(getIploc(cell))}
          isHighlighted={getId(cell) == highlightCellId}
        />;
      } else {
        cellElement = <Cell
          x={x}
          y={y}
          size={cellSize}
          filled={false}
          onClick={specificOnClick}
          key={(((x+y)*(x+y+1))/2)+y}
          pointX={1}
          pointY={1}
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
 * Gets the x offset from iploc
 */
function iplocToXOffset(iploc) {
  if (getBinaryDigit(iploc, 7)) {
    return 1;
  } else if (getBinaryDigit(iploc, 6)) {
    return 0;
  } else if (getBinaryDigit(iploc, 5)) {
    return -1;
  } else if (getBinaryDigit(iploc, 4)) {
    return 1;
  } else if (getBinaryDigit(iploc, 3)) {
    return -1;
  } else if (getBinaryDigit(iploc, 2)) {
    return 1;
  } else if (getBinaryDigit(iploc, 1)) {
    return 0;
  } else if (getBinaryDigit(iploc, 0)) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Gets the y offset from iploc
 */
 function iplocToYOffset(iploc) {
  if (getBinaryDigit(iploc, 7)) {
    return 1;
  } else if (getBinaryDigit(iploc, 6)) {
    return 1;
  } else if (getBinaryDigit(iploc, 5)) {
    return 1;
  } else if (getBinaryDigit(iploc, 4)) {
    return 0;
  } else if (getBinaryDigit(iploc, 3)) {
    return 0;
  } else if (getBinaryDigit(iploc, 2)) {
    return -1;
  } else if (getBinaryDigit(iploc, 1)) {
    return -1;
  } else if (getBinaryDigit(iploc, 0)) {
    return -1;
  } else {
    return 0;
  }
}


/**
 * Gets the value of the digit
 */
function getBinaryDigit(number, digitNumber) {
  return (number >>> digitNumber) & 1;
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
  const {x,
    y,
    size,
    filled,
    onClick,
    color,
    pointX,
    pointY,
    isHighlighted} = props;
  const trueX = x*size;
  const trueY = y*size;

  // Determine fill color
  let fillColor;
  if (!filled) {
    fillColor = 'rgb(255,255,255)';
  } else {
    if (color.rgb) {
      fillColor = 'rgb('+color.r+','+color.g+','+color.b+')';
    } else {
      let sPercent;
      let vPercent;
      if (color.noNorm) {
        sPercent = ((color.s)/255)*100;
        vPercent = ((color.v)/255)*100;
      } else {
        sPercent = round(((((color.s)/255)*0.2)+0.4)*100, 0);
        vPercent = round(((((color.v)/255)*0.2)+0.4)*100, 0);
      }
      fillColor = 'hsl('+color.h+','+sPercent+'%,'+vPercent+'%)';
    }
  }

  // Arrow
  const lowX = trueX;
  const lowY = trueY;
  const midX = trueX+(size/2);
  const midY = trueY+(size/2);
  const hiX = trueX+size;
  const hiY = trueY+size;
  const lineOriginX = midX;
  const lineOriginY = midY;
  let lineEndX;
  let lineEndY;
  if (pointX == 1) {
    lineEndX = hiX;
  } else if (pointX == 0) {
    lineEndX = midX;
  } else if (pointX == -1) {
    lineEndX = lowX;
  }
  if (pointY == 1) {
    lineEndY = hiY;
  } else if (pointY == 0) {
    lineEndY = midY;
  } else if (pointY == -1) {
    lineEndY = lowY;
  }

  // Key - It has to be unique, so we use a (R, R) -> R function
  const key = (((x+y)*(x+y+1))/2)+y; // Cantor Pairing Function

  return (
    <>
      <rect
        key={key}
        className='box'
        style={{fill: fillColor}}
        x={trueX}
        y={trueY}
        width={size}
        height={size}
        onClick={() => onClick()}/>
      {isHighlighted ? <circle
        cx={midX}
        cy={midY}
        r={size/4}
        style={{fill: 'rgb(255, 0, 0)'}} /> : null }
      {filled ? <line
        x1={lineOriginX}
         x2={lineEndX}
         y1={lineOriginY}
         y2={lineEndY}
         stroke='yellow'/> : null}
    </>
    );
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
  highlightCellId: PropTypes.number,
};

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  filled: PropTypes.bool,
  color: PropTypes.object,
  pointX: PropTypes.number,
  pointY: PropTypes.number,
  isHighlighted: PropTypes.bool,
};

export default CellGridDisplay;
