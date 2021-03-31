package org.architectdrone.archevo.pangea.implementation.cell;

import org.junit.jupiter.api.Test;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CellStatsTest {
    @Test
    public void mutateCellWorks_increasing() {
        CellStats cellStats = new CellStats();
        cellStats.species_h = 1;
        cellStats.species_s = 2;
        cellStats.species_v = 3;
        Random mockRandom = mock(Random.class);
        when(mockRandom.nextInt(3)).thenReturn(2);
        cellStats.mutateSpeciesColor(mockRandom);
        assertEquals(2, cellStats.species_h);
        assertEquals(3, cellStats.species_s);
        assertEquals(4, cellStats.species_v);
    }

    @Test
    public void mutateCellWorks_increasingAtBorder() {
        CellStats cellStats = new CellStats();
        cellStats.species_h = 255;
        cellStats.species_s = 255;
        cellStats.species_v = 255;
        Random mockRandom = mock(Random.class);
        when(mockRandom.nextInt(3)).thenReturn(2);
        cellStats.mutateSpeciesColor(mockRandom);
        assertEquals(0, cellStats.species_h);
        assertEquals(255, cellStats.species_s);
        assertEquals(255, cellStats.species_v);
    }

    @Test
    public void mutateCellWorks_stayingConstant() {
        CellStats cellStats = new CellStats();
        cellStats.species_h = 1;
        cellStats.species_s = 2;
        cellStats.species_v = 3;
        Random mockRandom = mock(Random.class);
        when(mockRandom.nextInt(3)).thenReturn(1);
        cellStats.mutateSpeciesColor(mockRandom);
        assertEquals(1, cellStats.species_h);
        assertEquals(2, cellStats.species_s);
        assertEquals(3, cellStats.species_v);
    }

    @Test
    public void mutateCellWorks_decreasing() {
        CellStats cellStats = new CellStats();
        cellStats.species_h = 4;
        cellStats.species_s = 3;
        cellStats.species_v = 2;
        Random mockRandom = mock(Random.class);
        when(mockRandom.nextInt(3)).thenReturn(0);
        cellStats.mutateSpeciesColor(mockRandom);
        assertEquals(3, cellStats.species_h);
        assertEquals(2, cellStats.species_s);
        assertEquals(1, cellStats.species_v);
    }

    @Test
    public void mutateCellWorks_decreasingAtBorder() {
        CellStats cellStats = new CellStats();
        cellStats.species_h = 0;
        cellStats.species_s = 0;
        cellStats.species_v = 0;
        Random mockRandom = mock(Random.class);
        when(mockRandom.nextInt(3)).thenReturn(0);
        cellStats.mutateSpeciesColor(mockRandom);
        assertEquals(255, cellStats.species_h);
        assertEquals(0, cellStats.species_s);
        assertEquals(0, cellStats.species_v);
    }
}
