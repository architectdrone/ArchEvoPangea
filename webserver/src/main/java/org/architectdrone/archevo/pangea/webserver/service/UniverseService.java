package org.architectdrone.archevo.pangea.webserver.service;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.universe.Universe;
import org.springframework.stereotype.Service;

@Service
public class UniverseService {
    @Getter private static Universe universe = null;

    public static void run(Universe universe)
    {
        UniverseService.universe = universe;
        while (true) universe.iterate();
    }
}
