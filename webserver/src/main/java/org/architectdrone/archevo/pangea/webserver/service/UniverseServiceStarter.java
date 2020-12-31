package org.architectdrone.archevo.pangea.webserver.service;

import org.architectdrone.archevo.pangea.implementation.universe.Universe;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.concurrent.Executor;

@Component
public class UniverseServiceStarter implements ApplicationRunner {
    private final Executor executor;
    public UniverseServiceStarter(Executor executor)
    {
        this.executor = executor;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        Universe universe = new Universe(UniverseSettings.builder()
                .iterationCost(0)
                .moveCost(1)
                .influxRate(1)
                .size(64).build());
        Runnable universeServiceRunner = () -> UniverseService.run(universe);
        executor.execute(universeServiceRunner);

    }
}
