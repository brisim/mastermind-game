package com.mastermind.controller;

import com.mastermind.service.MastermindService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
}
