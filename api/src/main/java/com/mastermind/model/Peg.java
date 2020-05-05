package com.mastermind.model;

import java.util.Objects;

public class Peg {
    private String color;
    private int position;

    public Peg() {
    }

    public Peg(String color, int position) {
        this.color = color;
        this.position = position;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Peg)) return false;
        Peg peg = (Peg) o;
        return getPosition() == peg.getPosition() &&
                Objects.equals(getColor(), peg.getColor());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getColor(), getPosition());
    }
}
