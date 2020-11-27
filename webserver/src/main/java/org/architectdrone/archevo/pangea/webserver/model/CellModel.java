package org.architectdrone.archevo.pangea.webserver.model;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.cell.Cell;
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
    final Integer age;
    final Integer lineage;
    final Integer virility;
    public CellModel(int x, int y, Cell cell, UniverseSettings universeSettings)
    {
        this.age = cell.cellStats.age;
        this.lineage = cell.cellStats.lineage;
        this.virility = cell.cellStats.virility;

        this.x = x;
        this.y = y;
        this.instructionPointer = cell.getIP();
        this.genome = cell.getGenome().stream().map(instruction -> new InstructionModel(instruction, universeSettings)).collect(Collectors.toList());
        this.registers = IntStream.range(0, 8).mapToObj(i -> new RegisterModel(i, cell.getRegister(i))).collect(Collectors.toList());
    }
}