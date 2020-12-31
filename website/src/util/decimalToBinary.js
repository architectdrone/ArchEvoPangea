/**
 * Converts a number to a string representing it's binary value.
 * @param {*} decimal The number to convert.
 * @param {*} size The number of bits.
 */
function decimalToBinary(decimal, size) {
  const incompleteBinary = decimal.toString(2);
  const completeBinary = incompleteBinary.padStart(size, '0');
  return '0b'+completeBinary;
}

export default decimalToBinary;
