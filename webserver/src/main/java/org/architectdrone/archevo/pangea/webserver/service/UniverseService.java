package org.architectdrone.archevo.pangea.webserver.service;

import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.universe.Universe;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicReference;

@Service
public class UniverseService {
    @Getter private static AtomicReference<Universe> universe = new AtomicReference<>();

    public static void run(Universe universe)
    {
        UniverseService.universe.set(universe);
        while (true)
        {
            UniverseService.universe.set(Universe.iterateAndReturn(UniverseService.universe.get()));
        }
    }
}
