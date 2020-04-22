package com.mastermind.model;

public enum  Colors {
    BLUE("btn btn-primary btn-circle btn-xl"),
    GREEN("btn btn-success btn-circle btn-xl"),
    OPEN_BLUE("btn btn-info btn-circle btn-xl"),
    ORANGE("btn btn-warning btn-circle btn-xl"),
    RED("btn btn-danger btn-circle btn-xl"),
    GREY("btn btn-secondary btn-circle btn-xl");

    private final String color;

    Colors(String color) {
        this.color = color;
    }

    private String getColor() { return color; }
}