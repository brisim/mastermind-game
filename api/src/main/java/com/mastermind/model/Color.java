package com.mastermind.model;

public enum  Color {
    BLUE("Blue"),
    GREEN("Green"),
    OPEN_BLUE("Open_blue"),
    ORANGE("Orange"),
    RED("Red"),
    GREY("Grey");

    private final String color;

    Color(String color) {
        this.color = color;
    }

    private String getColor() { return color; }
}