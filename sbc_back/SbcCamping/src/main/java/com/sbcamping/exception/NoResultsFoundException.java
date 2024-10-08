package com.sbcamping.exception;

public class NoResultsFoundException extends RuntimeException {
    public NoResultsFoundException(String message) {
        super(message);
    }
}
