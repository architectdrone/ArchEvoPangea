package org.architectdrone.archevo.pangea.implementation;

import org.architectdrone.archevo.pangea.implementation.universe.Universe;
import org.architectdrone.archevo.pangea.implementation.universe.UniverseSettings;

public class DummyApplication {
    public static void main(String[] args) {
        Universe universe = new Universe(UniverseSettings.builder().build());
        while (true)
        {
            universe.iterate();
        }
    }
}
