package com.mastermind.controller;

import com.mastermind.model.AttemptRequest;
import com.mastermind.model.FeedbackResponse;
import com.mastermind.service.MastermindService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
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

    @PostMapping("/check")
    public ResponseEntity<?> check(@RequestBody AttemptRequest  attemptRequest) {
//        service.check(attemptRequest);
        return ResponseEntity.ok().build();
    }
}
