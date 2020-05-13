package com.mastermind.model;

public class Color {
   public enum AttemptColor {
       BLUE("Blue"),
       GREEN("Green"),
       OPEN_BLUE("Open_blue"),
       ORANGE("Orange"),
       RED("Red"),
       GREY("Grey");

       private final String color;
       AttemptColor(String color) {
           this.color = color;
       }
   }

   public enum FeedbackColor {
       WHITE("White"),
       RED("Red"),
       BLACK("Black");

       private final String color;

       FeedbackColor(String color) {
           this.color = color;
       }
   }
}