package com.mastermind.model;

import java.util.List;
import java.util.Objects;

public class FeedbackResponse {
    List<Peg> feedback;

    public FeedbackResponse(List<Peg> feedback) {
        this.feedback = feedback;
    }

    public List<Peg> getFeedback() {
        return feedback;
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
