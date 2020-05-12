package com.mastermind.service;

import com.mastermind.model.Color;
import com.mastermind.model.FeedbackColor;
import com.mastermind.model.FeedbackResponse;
import com.mastermind.model.Peg;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MastermindServiceTest {
    MastermindService service;
    private List<String> secretKey;

    @BeforeEach
    void setUp(){
        service = new MastermindService();
        secretKey = new ArrayList<>();
        secretKey.add(Color.ORANGE.name());
        secretKey.add(Color.RED.name());
        secretKey.add(Color.BLUE.name());
        secretKey.add(Color.GREEN.name());
        service.setSecretKey(secretKey);
    }

    @Test
    void shouldPass() {
        assertTrue(true);
    }

    @Test
    void shouldReturnFourColors() {
        List<String> colors = service.start();
        assertThat(colors.size()).isEqualTo(4);
    }

    @Test
    void shouldFailForAttemptWithoutFourPegs() {
        List<Peg> invalidAttempt = new ArrayList<>();
        invalidAttempt.add(new Peg(Color.ORANGE.name(), 1));
        invalidAttempt.add(new Peg(Color.BLUE.name(), 2));

        assertThat(service.isValidAttempt(invalidAttempt)).isEqualTo(false);
    }

    @Test
    void shouldFailForAttemptWithInvalidPosition() {
        List<Peg> invalidAttempt = new ArrayList<>();
        invalidAttempt.add(new Peg(Color.ORANGE.name(), 5));
        invalidAttempt.add(new Peg(Color.BLUE.name(), 6));
        invalidAttempt.add(new Peg(Color.BLUE.name(), 7));
        invalidAttempt.add(new Peg(Color.BLUE.name(), 8));

        assertThat(service.isValidAttempt(invalidAttempt)).isEqualTo(false);
    }

    @Test
    void shouldFailForAttemptWithInvalidColorName() {
        List<Peg> invalidAttempt = new ArrayList<>();
        invalidAttempt.add(new Peg("Yellow", 0));
        invalidAttempt.add(new Peg(Color.BLUE.name(), 1));
        invalidAttempt.add(new Peg(Color.BLUE.name(), 2));
        invalidAttempt.add(new Peg(Color.BLUE.name(), 3));

        assertThat(service.isValidAttempt(invalidAttempt)).isEqualTo(false);
    }

    @Test
    void shouldReturn1R3WForOneCPMatchAnd3PMatch() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.ORANGE.name(), 0));
        attempt.add(new Peg(Color.BLUE.name(), 1));
        attempt.add(new Peg(Color.GREEN.name(), 2));
        attempt.add(new Peg(Color.RED.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(FeedbackColor.RED.name(), 0));
        expectedFeedback.add(new Peg(FeedbackColor.WHITE.name(), 1));
        expectedFeedback.add(new Peg(FeedbackColor.WHITE.name(), 2));
        expectedFeedback.add(new Peg(FeedbackColor.WHITE.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void shouldReturn4WhitePegsForMatchingPositionNoColor() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.RED.name(), 0));
        attempt.add(new Peg(Color.ORANGE.name(), 1));
        attempt.add(new Peg(Color.GREEN.name(), 2));
        attempt.add(new Peg(Color.BLUE.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(FeedbackColor.WHITE.name(), 0));
        expectedFeedback.add(new Peg(FeedbackColor.WHITE.name(), 1));
        expectedFeedback.add(new Peg(FeedbackColor.WHITE.name(), 2));
        expectedFeedback.add(new Peg(FeedbackColor.WHITE.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void shouldReturn4RedPegsForMatchingPositionAndColor() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.ORANGE.name(), 0));
        attempt.add(new Peg(Color.RED.name(), 1));
        attempt.add(new Peg(Color.BLUE.name(), 2));
        attempt.add(new Peg(Color.GREEN.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(FeedbackColor.RED.name(), 0));
        expectedFeedback.add(new Peg(FeedbackColor.RED.name(), 1));
        expectedFeedback.add(new Peg(FeedbackColor.RED.name(), 2));
        expectedFeedback.add(new Peg(FeedbackColor.RED.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void shouldReturn4BlackPegsForNoMatchingColor() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.GREY.name(), 0));
        attempt.add(new Peg(Color.GREY.name(), 1));
        attempt.add(new Peg(Color.GREY.name(), 2));
        attempt.add(new Peg(Color.OPEN_BLUE.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(FeedbackColor.BLACK.name(), 0));
        expectedFeedback.add(new Peg(FeedbackColor.BLACK.name(), 1));
        expectedFeedback.add(new Peg(FeedbackColor.BLACK.name(), 2));
        expectedFeedback.add(new Peg(FeedbackColor.BLACK.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void shouldReturn2Black1White1RedPegs() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.BLUE.name(), 0));
        attempt.add(new Peg(Color.RED.name(), 1));
        attempt.add(new Peg(Color.GREY.name(), 2));
        attempt.add(new Peg(Color.OPEN_BLUE.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(FeedbackColor.WHITE.name(), 0));
        expectedFeedback.add(new Peg(FeedbackColor.RED.name(), 1));
        expectedFeedback.add(new Peg(FeedbackColor.BLACK.name(), 2));
        expectedFeedback.add(new Peg(FeedbackColor.BLACK.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }
}