function dec_to_binary(decimal, size) {
    const incomplete_binary = decimal.toString(2);
    const complete_binary = incomplete_binary.padStart(size, "0")
    return "0b"+complete_binary;
}

export default dec_to_binary;