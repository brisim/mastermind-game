package com.mastermind.controller;

import com.mastermind.service.MastermindService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MastermindController {

    MastermindService service;

    public MastermindController(MastermindService service) {
        this.service = service;
    }

    @GetMapping("/start")
    public ResponseEntity<?> start() {
        service.start();
        return ResponseEntity.ok().build();
    }
}
