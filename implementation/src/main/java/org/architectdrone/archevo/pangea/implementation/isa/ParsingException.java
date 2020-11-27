package org.architectdrone.archevo.pangea.implementation.isa;

/**
 * Thrown when a token could not be parsed.
 */
public class ParsingException extends Exception{
    public ParsingException(String unknownToken){
        super("Token "+unknownToken+ " could not be parsed.");
    }
}
