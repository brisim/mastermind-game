package com.mastermind.model;

import java.util.List;
import java.util.Objects;

public class FeedbackResponse {
    private List<Peg> feedback;
    private boolean isWinner;

    public FeedbackResponse(List<Peg> feedback, boolean isWinner) {
        this.feedback = feedback;
        this.isWinner = isWinner;
    }

    public List<Peg> getFeedback() {
        return feedback;
    }

    public boolean isWinner() {
        return isWinner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FeedbackResponse)) return false;
        FeedbackResponse that = (FeedbackResponse) o;
        return Objects.equals(feedback, that.feedback);
    }

    @Override
    public int hashCode() {
        return Objects.hash(feedback);
    }
}
