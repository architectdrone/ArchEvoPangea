package org.architectdrone.archevo.pangea.implementation.universe;

import lombok.Builder;
import lombok.Getter;
import org.architectdrone.archevo.pangea.implementation.combathandler.CaptureTheFlagPercentage;
import org.architectdrone.archevo.pangea.implementation.combathandler.CombatHandler;
import org.architectdrone.archevo.pangea.implementation.isa.ISA;
import org.architectdrone.archevo.pangea.implementation.isa.asia.ASIA;
import org.architectdrone.archevo.pangea.implementation.reproductionhandler.ReproductionHandler;
import org.architectdrone.archevo.pangea.implementation.reproductionhandler.SetCost;

@Builder
@Getter
public class UniverseSettings {
    @Builder.Default private final int initialEnergy = 64;
    @Builder.Default private final int seed = 69420;
    @Builder.Default private final float mutationChance = 0.01f;
    @Builder.Default private final int influxRate = 1;
    @Builder.Default private final int iterationCost = 1;
    @Builder.Default private final int numberOfGenes = 16;
    @Builder.Default private final int moveCost = 0;
    @Builder.Default private final int size = 32;
    @Builder.Default private final ISA isa = new ASIA();
    @Builder.Default private final IterationExecutionMode iterationExecutionMode = IterationExecutionMode.INSTRUCTION_BY_INSTRUCTION;
    @Builder.Default private final ReproductionHandler reproductionHandler = new SetCost(64);
    @Builder.Default private final CombatHandler combatHandler = new CaptureTheFlagPercentage();
}
