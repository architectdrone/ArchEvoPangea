
function RegisterDisplay(props) {
    const {registers} = props;

    const table_elements = [];
    for (let i = 0; i < 8; i++)
    {
        const left_register = registers[i];
        const right_register = registers[i+8];
        const new_row = (<tr>
                            <td><b>{left_register.name}</b></td>
                            <td>{left_register.value}</td>
                            <td>{dec_to_binary(left_register.value)}</td>
                            <td><b>{right_register.name}</b></td>
                            <td>{right_register.value}</td>
                            <td>{dec_to_binary(right_register.value)}</td>
                        </tr>);
        table_elements.push(new_row);
    }

    return (
        <table>
            {table_elements}
        </table>
    )
}

function dec_to_binary(decimal) {
    const incomplete_binary = decimal.toString(2);
    const complete_binary = incomplete_binary.padStart(8, "0")
    return "0b"+complete_binary;
}

export default RegisterDisplay;