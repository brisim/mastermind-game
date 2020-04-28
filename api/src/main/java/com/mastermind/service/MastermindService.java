package com.mastermind.service;

import com.mastermind.model.AttemptRequest;
import com.mastermind.model.Colors;
import com.mastermind.model.FeedbackResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class MastermindService {
    private List<String> secretKey;

    public List<String> start() {
        List<String> colors = new ArrayList<>();
        secretKey = new ArrayList<>();

        colors.add(Colors.RED.name());
        colors.add(Colors.GREEN.name());
        colors.add(Colors.BLUE.name());
        colors.add(Colors.ORANGE.name());
        colors.add(Colors.OPEN_BLUE.name());
        colors.add(Colors.GREY.name());
        Collections.shuffle(colors);

        secretKey = colors.subList(0,4);
        return secretKey;
    }

    public FeedbackResponse check(AttemptRequest attemptRequest) {
        return new FeedbackResponse();
    }
}
