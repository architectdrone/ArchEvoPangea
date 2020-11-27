package org.architectdrone.archevo.pangea.webserver.model;

import org.architectdrone.archevo.pangea.implementation.isa.asia.ASIARegister;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;

public class RegisterModel {
    public Integer registerValue;
    public Integer registerNumber;
    public String registerName;
    public RegisterModel(Integer registerNumber, Integer registerValue)
    {
        this.registerNumber = registerNumber;
        this.registerValue = registerValue;
        this.registerName = ASIARegister.fromBinary(registerNumber).toString();
    }
}
