package org.architectdrone.archevo.pangea.implementation.universe;

import lombok.EqualsAndHashCode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@EqualsAndHashCode
class UniverseTest {
    @Test
    void influxRate_isCorrect() throws Exception {
        Universe universe = new Universe(UniverseSettings.builder().influxRate(3).build());
        universe.iterate();
        assertEquals(3, universe.getCellContainer().getAll().size());
    }
}