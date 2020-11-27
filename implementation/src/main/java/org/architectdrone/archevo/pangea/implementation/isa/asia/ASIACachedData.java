package org.architectdrone.archevo.pangea.implementation.isa.asia;

import java.util.HashMap;
import org.architectdrone.archevo.pangea.implementation.cell.ISACachedData;

public class ASIACachedData implements ISACachedData {
    public final HashMap<Integer, Integer> jumpMap;
    public final HashMap<Integer, Integer> endOfTemplateMap;

    public ASIACachedData(final HashMap<Integer, Integer> jumpMap, final HashMap<Integer, Integer> endOfTemplateMap) {
        this.jumpMap = jumpMap;
        this.endOfTemplateMap = endOfTemplateMap;
    }
}
