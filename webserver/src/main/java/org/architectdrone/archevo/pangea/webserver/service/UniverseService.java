package org.architectdrone.archevo.pangea.webserver.service;

import lombok.Getter;
import lombok.Setter;
import org.architectdrone.archevo.pangea.implementation.universe.Universe;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class UniverseService {
    @Getter private static final AtomicReference<Universe> universe = new AtomicReference<>();
    @Getter @Setter private static AtomicBoolean isRunning = new AtomicBoolean(true);
    @Getter @Setter private static AtomicBoolean shouldStep = new AtomicBoolean();

    public static void run(Universe universe)
    {
        UniverseService.universe.set(universe);
        while (true)
        {
            if (isRunning.get() || shouldStep.get())
            {
                UniverseService.universe.set(Universe.iterateAndReturn(UniverseService.universe.get()));
                shouldStep.set(false);
            }

        }
    }
}
