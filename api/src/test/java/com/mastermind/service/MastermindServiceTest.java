package com.mastermind.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MastermindServiceTest {
    MastermindService service;

    @BeforeEach
    void setUp(){
        service = new MastermindService();
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
}