import dec_to_binary from "../../util/dec_to_binary"

function ProgramDisplay(props) {
    const {instructions, instructionPointer} = props;

    const instructionElements = [];
    for (let i = 0; i < 32; i++)
    {
        let {translatedInstruction, instruction} = instructions[i];

        instructionElements.push(
            <Instruction translatedInstruction={translatedInstruction} instruction={instruction} isCurrent={instructionPointer==i} number={i}/>
        )
    }

    return (
        <table>
            {instructionElements}
        </table>
    )
}

function Instruction(props) {
    const {translatedInstruction, instruction, number, isCurrent} = props;

    return (
    <tr>
        <td>{isCurrent ? ">" : ""}</td>
        <td>{number}</td>
        <td><b>{translatedInstruction}</b></td>
        <td>{dec_to_binary(instruction, 11)}</td>
    </tr>)
}

export default ProgramDisplay;