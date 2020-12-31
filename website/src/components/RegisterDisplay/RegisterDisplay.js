import dec_to_binary from "../../util/dec_to_binary"

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
                            <td>{dec_to_binary(left_register.value, 8)}</td>
                            <td><b>{right_register.name}</b></td>
                            <td>{right_register.value}</td>
                            <td>{dec_to_binary(right_register.value, 8)}</td>
                        </tr>);
        table_elements.push(new_row);
    }

    return (
        <table>
            {table_elements}
        </table>
    )
}

export default RegisterDisplay;