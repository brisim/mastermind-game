package com.mastermind.model;

import java.util.List;

public class AttemptRequest {
    private List<Peg> attempt;

    public AttemptRequest(List<Peg> attempt) {
        this.attempt = attempt;
    }
}
