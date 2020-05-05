package com.mastermind.model;

import java.util.List;

public class AttemptRequest {
    private List<Peg> attempt;

    public AttemptRequest() {
    }

    public AttemptRequest(List<Peg> attempt) {
        this.attempt = attempt;
    }

    public List<Peg> getAttempt() {
        return attempt;
    }

    public void setAttempt(List<Peg> attempt) {
        this.attempt = attempt;
    }
}
