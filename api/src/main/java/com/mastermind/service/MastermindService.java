package com.mastermind.service;

import com.mastermind.model.AttemptRequest;
import com.mastermind.model.Colors;
import com.mastermind.model.FeedbackResponse;
import com.mastermind.model.Peg;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class MastermindService {
    private List<String> secretKey;
    private List<String> colors;

    public MastermindService() {
        populateColors();
    }

    private void populateColors() {
        colors = new ArrayList<>();
        colors.add(Colors.RED.name());
        colors.add(Colors.GREEN.name());
        colors.add(Colors.BLUE.name());
        colors.add(Colors.ORANGE.name());
        colors.add(Colors.OPEN_BLUE.name());
        colors.add(Colors.GREY.name());
    }

    public void setSecretKey(List<String> secretKey) {
        this.secretKey = secretKey;
    }

    public List<String> start() {
        secretKey = new ArrayList<>();
        Collections.shuffle(colors);
        secretKey = colors.subList(0,4);
        return secretKey;
    }

    public FeedbackResponse check(List<Peg> attempt) {
        List<Peg> pegs = new ArrayList<>();
        pegs.add(new Peg("White", 0));
        pegs.add(new Peg("White", 1));
        pegs.add(new Peg("White", 2));
        pegs.add(new Peg("White", 3));

        FeedbackResponse feedback = new FeedbackResponse(pegs);
//        for (Peg peg: attempt) {
//            if (secretKey.contains(peg.getColor())) {
//
//            }
//        }

        return feedback;
    }

    public boolean isValidAttempt(List<Peg> attempt) {
        if (attempt.size() != 4) {
            return false;
        }

        for (Peg peg: attempt) {
            if (!isValidPosition(peg.getPosition()) || !isValidColor(peg.getColor())) {
                return false;
            }
        }

        return true;
    }

    private boolean isValidColor(String color) {
        return colors.contains(color);
    }

    private boolean isValidPosition(int position) {
        return (position ==0 || position ==1 || position ==2|| position ==3);
    }
}
