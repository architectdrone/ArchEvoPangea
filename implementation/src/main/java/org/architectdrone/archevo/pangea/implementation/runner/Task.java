package org.architectdrone.archevo.pangea.implementation.runner;

import java.util.function.Consumer;

import org.architectdrone.archevo.pangea.implementation.universe.Universe;

public class Task {
    final Consumer<Universe> consumer;
    final int frequency;

    public Task(Consumer<Universe> consumer, int frequency)
    {
        this.consumer = consumer;
        this.frequency = frequency;
    }
}
