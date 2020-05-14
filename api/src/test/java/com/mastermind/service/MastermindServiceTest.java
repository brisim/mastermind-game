package com.mastermind.service;

import com.mastermind.model.Color;
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
        secretKey.add(Color.AttemptColor.ORANGE.name());
        secretKey.add(Color.AttemptColor.RED.name());
        secretKey.add(Color.AttemptColor.BLUE.name());
        secretKey.add(Color.AttemptColor.GREEN.name());
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
        invalidAttempt.add(new Peg(Color.AttemptColor.ORANGE.name(), 1));
        invalidAttempt.add(new Peg(Color.AttemptColor.BLUE.name(), 2));

        assertThat(service.isValidAttempt(invalidAttempt)).isEqualTo(false);
    }

    @Test
    void shouldFailForAttemptWithInvalidPosition() {
        List<Peg> invalidAttempt = new ArrayList<>();
        invalidAttempt.add(new Peg(Color.AttemptColor.ORANGE.name(), 5));
        invalidAttempt.add(new Peg(Color.AttemptColor.BLUE.name(), 6));
        invalidAttempt.add(new Peg(Color.AttemptColor.BLUE.name(), 7));
        invalidAttempt.add(new Peg(Color.AttemptColor.BLUE.name(), 8));

        assertThat(service.isValidAttempt(invalidAttempt)).isEqualTo(false);
    }

    @Test
    void shouldFailForAttemptWithInvalidColorName() {
        List<Peg> invalidAttempt = new ArrayList<>();
        invalidAttempt.add(new Peg("Yellow", 0));
        invalidAttempt.add(new Peg(Color.AttemptColor.BLUE.name(), 1));
        invalidAttempt.add(new Peg(Color.AttemptColor.BLUE.name(), 2));
        invalidAttempt.add(new Peg(Color.AttemptColor.BLUE.name(), 3));

        assertThat(service.isValidAttempt(invalidAttempt)).isEqualTo(false);
    }

    @Test
    void shouldReturn1R3WForOneCPMatchAnd3PMatch() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.AttemptColor.ORANGE.name(), 0));
        attempt.add(new Peg(Color.AttemptColor.BLUE.name(), 1));
        attempt.add(new Peg(Color.AttemptColor.GREEN.name(), 2));
        attempt.add(new Peg(Color.AttemptColor.RED.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(Color.FeedbackColor.RED.name(), 0));
        expectedFeedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 1));
        expectedFeedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 2));
        expectedFeedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void shouldReturn4WhitePegsForMatchingPositionNoColor() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.AttemptColor.RED.name(), 0));
        attempt.add(new Peg(Color.AttemptColor.ORANGE.name(), 1));
        attempt.add(new Peg(Color.AttemptColor.GREEN.name(), 2));
        attempt.add(new Peg(Color.AttemptColor.BLUE.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 0));
        expectedFeedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 1));
        expectedFeedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 2));
        expectedFeedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void shouldReturn4RedPegsForMatchingPositionAndColor() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.AttemptColor.ORANGE.name(), 0));
        attempt.add(new Peg(Color.AttemptColor.RED.name(), 1));
        attempt.add(new Peg(Color.AttemptColor.BLUE.name(), 2));
        attempt.add(new Peg(Color.AttemptColor.GREEN.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(Color.FeedbackColor.RED.name(), 0));
        expectedFeedback.add(new Peg(Color.FeedbackColor.RED.name(), 1));
        expectedFeedback.add(new Peg(Color.FeedbackColor.RED.name(), 2));
        expectedFeedback.add(new Peg(Color.FeedbackColor.RED.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void shouldReturn4BlackPegsForNoMatchingColor() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.AttemptColor.GREY.name(), 0));
        attempt.add(new Peg(Color.AttemptColor.GREY.name(), 1));
        attempt.add(new Peg(Color.AttemptColor.GREY.name(), 2));
        attempt.add(new Peg(Color.AttemptColor.OPEN_BLUE.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(Color.FeedbackColor.BLACK.name(), 0));
        expectedFeedback.add(new Peg(Color.FeedbackColor.BLACK.name(), 1));
        expectedFeedback.add(new Peg(Color.FeedbackColor.BLACK.name(), 2));
        expectedFeedback.add(new Peg(Color.FeedbackColor.BLACK.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void shouldReturn2Black1White1RedPegs() {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.AttemptColor.BLUE.name(), 0));
        attempt.add(new Peg(Color.AttemptColor.RED.name(), 1));
        attempt.add(new Peg(Color.AttemptColor.GREY.name(), 2));
        attempt.add(new Peg(Color.AttemptColor.OPEN_BLUE.name(), 3));

        List<Peg> expectedFeedback = new ArrayList<>();
        expectedFeedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 0));
        expectedFeedback.add(new Peg(Color.FeedbackColor.RED.name(), 1));
        expectedFeedback.add(new Peg(Color.FeedbackColor.BLACK.name(), 2));
        expectedFeedback.add(new Peg(Color.FeedbackColor.BLACK.name(), 3));

        assertThat(service.check(attempt)).isEqualTo(expectedFeedback);
    }

    @Test
    void isEndOfGameShouldReturnTrueAfter10Attempts() {
        service.setAttemptNo(11);
        assertThat(service.isEndOfGame()).isEqualTo(true);
    }

    @Test
    void isEndOfGameShouldReturnTrueForAWin() {
//        service.
//        assertThat(service.isEndOfGame()).isEqualTo(true);
    }
}