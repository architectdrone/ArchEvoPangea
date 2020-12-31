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
      <td><b>{leftRegister.name}</b></td>
      <td>{leftRegister.value}</td>
      <td>{decimalToBinary(leftRegister.value, 8)}</td>
      <td><b>{rightRegister.name}</b></td>
      <td>{rightRegister.value}</td>
      <td>{decimalToBinary(rightRegister.value, 8)}</td>
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
            // The name of the register.
            name: PropTypes.string,
            // The value stored in the register.
            value: PropTypes.number,
          },
      ),
  ),
};

export default RegisterDisplay;
