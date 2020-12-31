import React from 'react';
import PropTypes from 'prop-types';

import decimalToBinary from '../../util/decimalToBinary';

/**
 * Displays all given registers.
 * Shows the title and the value, in base-10 and binary.
 */
function RegisterDisplay(props) {
  const {registers} = props;

  const tableElements = [];
  for (let i = 0; i < 8; i++) {
    const leftRegister = registers[i];
    const rightRegister = registers[i+8];
    const newRow = (<tr>
      <td><b>{leftRegister.registerName}</b></td>
      <td>{leftRegister.registerValue}</td>
      <td>{decimalToBinary(leftRegister.registerValue, 8)}</td>
      <td><b>{rightRegister.registerName}</b></td>
      <td>{rightRegister.registerValue}</td>
      <td>{decimalToBinary(rightRegister.registerValue, 8)}</td>
    </tr>);
    tableElements.push(newRow);
  }

  return (
    <table>
      {tableElements}
    </table>
  );
}

RegisterDisplay.propTypes = {
  // The registers to display. There should only be 8 of these.
  registers: PropTypes.arrayOf(
      PropTypes.shape(
          {
            // The registerName of the register.
            registerName: PropTypes.string.isRequired,
            // The value stored in the register.
            registerValue: PropTypes.number.isRequired,
          },
      ),
  ).isRequired,
};

export default RegisterDisplay;
