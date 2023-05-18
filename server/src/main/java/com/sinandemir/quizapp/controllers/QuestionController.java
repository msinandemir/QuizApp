package com.sinandemir.quizapp.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinandemir.quizapp.dto.request.QuestionSaveRequest;
import com.sinandemir.quizapp.dto.response.QuestionResponse;
import com.sinandemir.quizapp.services.QuestionService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/questions")
@RestController
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService service;

    @GetMapping
    ResponseEntity<List<QuestionResponse>> getAllQuestions() {
        return new ResponseEntity<List<QuestionResponse>>(service.getAllQuestions(), HttpStatus.OK);
    }

    @GetMapping("/{questionId}")
    ResponseEntity<QuestionResponse> getQuestion(@PathVariable Long questionId) {
        return new ResponseEntity<QuestionResponse>(service.getQuestion(questionId), HttpStatus.OK);
    }


    @PostMapping
    ResponseEntity<QuestionResponse> saveQuestion(@RequestBody QuestionSaveRequest question){
        return new ResponseEntity<QuestionResponse>(service.saveQuestion(question), HttpStatus.CREATED);
    }

    @DeleteMapping("/{questionId}")
    void deleteQuestion(@PathVariable Long questionId){
        service.deleteQuestion(questionId);
    }
}
