package org.architectdrone.archevo.pangea.implementation.cell;

import java.util.Random;

import static java.lang.Integer.max;
import static java.lang.Integer.min;

public class CellStats {
    public int lineage = 0; //Number of parents
    public int virility = 0; //Number of children
    public int age = 0; //Age of the cell
    public int parent_id = -1; //ID of the parent
    public int species_h = -1; //Used for visually tracking species (all are between 0 and 255)
    public int species_s = -1;
    public int species_v = -1;

    public void newSpeciesColor(Random random) {
        this.species_h = random.nextInt(255);
        this.species_s = random.nextInt(255);
        this.species_v = random.nextInt(255);
    }

    public void mutateSpeciesColor(Random random) {
        this.species_h = Math.floorMod((this.species_h + (random.nextInt(3) - 2)), 255);
        this.species_s = max(min((this.species_s + (random.nextInt(3) - 2)), 255), 0);
        this.species_v = max(min((this.species_v + (random.nextInt(3) - 2)), 255), 0);

    }
}
