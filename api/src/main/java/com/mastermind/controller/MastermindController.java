package com.mastermind.controller;

import com.mastermind.model.AttemptRequest;
import com.mastermind.model.FeedbackResponse;
import com.mastermind.model.Peg;
import com.mastermind.service.MastermindService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MastermindController {

    private MastermindService service;

    public MastermindController(MastermindService service) {
        this.service = service;
    }

    @GetMapping("/start")
    public ResponseEntity<?> start() {
        service.start();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/check")
    public ResponseEntity<?> check(@RequestBody AttemptRequest attemptRequest) {
        List<Peg> attempt = attemptRequest.getAttempt();
        if(!service.isValidAttempt(attempt)) {
            return ResponseEntity.badRequest().build();
        }
        List<Peg> feedback = service.check(attempt);
        FeedbackResponse feedbackResponse = new FeedbackResponse(feedback);
        return ResponseEntity.ok(feedbackResponse);
    }

    @GetMapping("/secret-key")
    public ResponseEntity<?> secretKey() {
        List<String> secretKey =  service.getSecretKey();
        return ResponseEntity.ok(secretKey);
    }
}
