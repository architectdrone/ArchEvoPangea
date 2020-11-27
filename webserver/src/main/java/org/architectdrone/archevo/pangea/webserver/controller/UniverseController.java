package org.architectdrone.archevo.pangea.webserver.controller;

import org.architectdrone.archevo.pangea.webserver.model.UniverseInformationModel;
import org.architectdrone.archevo.pangea.webserver.model.UniverseModel;
import org.architectdrone.archevo.pangea.webserver.service.UniverseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UniverseController {

    @GetMapping("/state")
    public UniverseModel getState()
    {
        return new UniverseModel(UniverseService.getUniverse().get());
    }

    @GetMapping("/information")
    public UniverseInformationModel getInformation()
    {
        return new UniverseInformationModel(UniverseService.getUniverse().get());
    }

    @PostMapping("/control/stop")
    public UniverseInformationModel stop()
    {
        UniverseService.getIsRunning().set(false);
        return getInformation();
    }

    @PostMapping("/control/start")
    public UniverseInformationModel start()
    {
        UniverseService.getIsRunning().set(true);
        return getInformation();
    }

    @PostMapping("/control/step")
    public UniverseInformationModel step()
    {
        UniverseService.getShouldStep().set(true);
        return getInformation();
    }
}
