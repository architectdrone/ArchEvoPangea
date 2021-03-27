package org.architectdrone.archevo.pangea.webserver.model;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
import org.architectdrone.archevo.pangea.implementation.isa.asia.ASIA;
import org.architectdrone.archevo.pangea.implementation.isa.asia.ASIARegister;
import org.architectdrone.archevo.pangea.implementation.misc.OffsetToCell;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Getter
public class CellModel {
    final Integer instructionPointer;
    final List<RegisterModel> registers;
    final List<InstructionModel> genome;
    final Integer x;
    final Integer y;
    final Integer id;
    final Integer age;
    final Integer lineage;
    final Integer virility;
    public CellModel(int x, int y, Cell cell, UniverseSettings universeSettings, OffsetToCell offsetToCell)
    {
        this.age = cell.cellStats.age;
        this.lineage = cell.cellStats.lineage;
        this.virility = cell.cellStats.virility;

        this.x = x;
        this.y = y;
        this.instructionPointer = cell.getIP();
        this.id = cell.getId();
        this.genome = cell.getGenome().stream().map(instruction -> new InstructionModel(instruction, universeSettings)).collect(Collectors.toList());
        int iploc = ASIA.getIploc(cell);
        int otherCellXOffset = ASIA.iplocToXOffset(iploc);
        int otherCellYOffset = ASIA.iplocToYOffset(iploc);
        Cell otherCell = offsetToCell.f(otherCellXOffset, otherCellYOffset);
        this.registers = IntStream.range(0, 16)
                .mapToObj(i -> new RegisterModel(i, registerNumberToValue(i, cell, otherCell)))
                .collect(Collectors.toList());
    }

    /**
     * Gets the value of a register, given it's value. Also supports virtual registers! TODO: Support different ISAs
     * @param registerNumber The number of the register
     * @param cell The cell
     * @param offsetToCell mapping function between an offset and a cell
     * @return The value of the register.
     */
    public static int registerNumberToValue(Integer registerNumber, Cell cell, OffsetToCell offsetToCell)
    {
        ASIARegister register = ASIARegister.fromBinary(registerNumber);
        return ASIA.getRegisterValue(cell, register, offsetToCell);
    }

    /**
     * Gets the value of a register, given it's value. Also supports virtual registers! TODO: Support different ISAs
     * @param registerNumber The number of the register
     * @param cell The cell
     * @param otherCell The other cell
     * @return The value of the register.
     */
    public static int registerNumberToValue(Integer registerNumber, Cell cell, Cell otherCell)
    {
        ASIARegister register = ASIARegister.fromBinary(registerNumber);
        return ASIA.getRegisterValue(cell, register, otherCell);
    }
}