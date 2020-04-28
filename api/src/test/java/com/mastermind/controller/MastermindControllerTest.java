package com.mastermind.controller;

import com.mastermind.model.AttemptRequest;
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
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MastermindController.class)
class MastermindControllerTest {

    @Autowired
    MockMvc mockMvc;

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
    public void shouldReturnFeedbackColors() throws Exception {
        List<Peg> attempt = new ArrayList<>();
        attempt.add(new Peg("Red", 1));
        attempt.add(new Peg("Blue", 2));
        attempt.add(new Peg("Yellow", 3));
        attempt.add(new Peg("Orange", 4));

        AttemptRequest attemptRequest = new AttemptRequest(attempt);

        String attemptAsJson = "[" +
                "{ \"color\": \" Red\", \"position\": 1 }, " +
                "{ \"color\": \" Blue\", \"position\": 2 }, " +
                "{ \"color\": \" Yellow\", \"position\": 3 }, " +
                "{ \"color\": \" Orange\", \"position\": 4 } " +
                "]";

        this.mockMvc.perform(post("/check")
                .content(attemptAsJson)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

//        verify(service, times(1)).check(attemptRequest);
    }
}
