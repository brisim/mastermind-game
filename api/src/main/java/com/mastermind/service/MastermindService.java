package com.mastermind.service;

import com.mastermind.model.Color;
import com.mastermind.model.Peg;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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
        Arrays.asList(Color.AttemptColor.values()).
                forEach(color -> colors.add(color.name()));
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

    public List<Peg> check(List<Peg> attempt) {
        List<Peg> feedback = new ArrayList<>();

        int index = 0;
        for (Peg peg: attempt) {
            if (secretKey.contains(peg.getColor())) {
                if (secretKey.indexOf(peg.getColor()) == index) {
                    feedback.add(new Peg(Color.FeedbackColor.RED.name(), index));
                }
                else {
                    feedback.add(new Peg(Color.FeedbackColor.WHITE.name(), index));
                }
            }
            else {
                feedback.add(new Peg(Color.FeedbackColor.BLACK.name(), index));
            }
            index++;
        }
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
