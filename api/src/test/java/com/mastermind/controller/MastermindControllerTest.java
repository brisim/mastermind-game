package com.mastermind.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mastermind.model.AttemptRequest;
import com.mastermind.model.Colors;
import com.mastermind.model.Peg;
import com.mastermind.service.MastermindService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
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
        attempt.add(new Peg(Colors.RED.name(), 0));
        attempt.add(new Peg(Colors.BLUE.name(), 1));
        attempt.add(new Peg(Colors.GREEN.name(), 2));
        attempt.add(new Peg(Colors.ORANGE.name(), 3));

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
        invalidAttempt.add(new Peg(Colors.BLUE.name(), 2));

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
}
