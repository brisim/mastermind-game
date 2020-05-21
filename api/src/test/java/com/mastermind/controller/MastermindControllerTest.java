package com.mastermind.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mastermind.model.AttemptRequest;
import com.mastermind.model.Color;
import com.mastermind.model.FeedbackResponse;
import com.mastermind.model.Peg;
import com.mastermind.service.MastermindService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MastermindController.class)
class MastermindControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    AttemptRequest attemptRequest;

    @MockBean
    MastermindService service;

    @Test
    public void shouldPass() {
        assertTrue(true);
    }

    @Test
    public void shouldStart() throws Exception {
     this.mockMvc.perform(get("/start")).andExpect(status().isOk());
     verify(service, times(1)).start();
    }

    @Test
    public void shouldCheckValidAttempt() throws Exception {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg(Color.AttemptColor.RED.name(), 0));
        attempt.add(new Peg(Color.AttemptColor.BLUE.name(), 1));
        attempt.add(new Peg(Color.AttemptColor.GREEN.name(), 2));
        attempt.add(new Peg(Color.AttemptColor.ORANGE.name(), 3));

        attemptRequest = new AttemptRequest(attempt);
        String attemptAsJson = mapper.writeValueAsString(attemptRequest);

        when(service.isValidAttempt(attempt)).thenReturn(true);

        this.mockMvc.perform(post("/check")
                .contentType(MediaType.APPLICATION_JSON)
                .content(attemptAsJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(service, times(1)).check(attempt);
    }

    @Test
    public void shouldFailForInvalidAttempt() throws Exception {
        List<Peg> invalidAttempt = new ArrayList<>();
        invalidAttempt.add(new Peg("Pink", 5));
        invalidAttempt.add(new Peg(Color.AttemptColor.BLUE.name(), 2));

        attemptRequest = new AttemptRequest(invalidAttempt);
        String attemptAsJson = mapper.writeValueAsString(attemptRequest);

        when(service.isValidAttempt(invalidAttempt)).thenReturn(false);

        this.mockMvc.perform(post("/check")
                .contentType(MediaType.APPLICATION_JSON)
                .content(attemptAsJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        verify(service, never()).check(invalidAttempt);
    }

    @Test
    public void shouldReturnFeedbackResponse() throws Exception {
        List<Peg> attempt = new ArrayList<>();
        attemptRequest = new AttemptRequest(attempt);
        String attemptAsJson = mapper.writeValueAsString(attemptRequest);

        List<Peg> feedback = new ArrayList<>();
        feedback.add(new Peg(Color.FeedbackColor.RED.name(), 0));
        feedback.add(new Peg(Color.FeedbackColor.RED.name(), 1));
        feedback.add(new Peg(Color.FeedbackColor.WHITE.name(), 2));
        feedback.add(new Peg(Color.FeedbackColor.BLACK.name(), 3));

        when(service.isValidAttempt(attempt)).thenReturn(true);
        when(service.check(attempt)).thenReturn(feedback);
        when(service.isWinner()).thenReturn(false);

        this.mockMvc.perform(post("/check")
                .contentType(MediaType.APPLICATION_JSON)
                .content(attemptAsJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.feedback").isArray())
                .andExpect(jsonPath("$.winner").value(false))
                .andExpect(status().isOk());
    }

    @Test
    void shouldRevealSecretKey() throws Exception {
        this.mockMvc.perform(get("/secret-key")).andExpect(status().isOk());
        verify(service, times(1)).getSecretKey();
    }
}
