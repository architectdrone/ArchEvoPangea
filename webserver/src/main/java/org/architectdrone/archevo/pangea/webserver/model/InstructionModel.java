package org.architectdrone.archevo.pangea.webserver.model;

import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;

public class InstructionModel {
    public String translatedInstruction;
    public Integer instruction;

    public InstructionModel(Integer instruction, UniverseSettings universeSettings)
    {
        this.instruction = instruction;
        this.translatedInstruction = universeSettings.getIsa().binaryToString(instruction);
    }
}
