package org.architectdrone.archevo.pangea.webserver.controller;

import org.architectdrone.archevo.pangea.webserver.model.UniverseInformationModel;
import org.architectdrone.archevo.pangea.webserver.model.UniverseModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UniverseController {

    @GetMapping("/state")
    public UniverseModel getState() {return null;}

    @GetMapping("/information")
    public UniverseInformationModel getInformation() {return null;}
}
