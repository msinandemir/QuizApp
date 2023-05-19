package com.sinandemir.quizapp.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sinandemir.quizapp.dto.request.QuizSaveRequest;
import com.sinandemir.quizapp.dto.response.QuizResponse;
import com.sinandemir.quizapp.services.QuizService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService service;

    @GetMapping("/getByCategoryId/{categoryId}")
    public ResponseEntity<Page<QuizResponse>> getAllQuizResponses(@RequestParam(defaultValue = "0") Integer pageNumber,
            @RequestParam(defaultValue = "20") Integer pageSize, @PathVariable Long categoryId) {
        Page<QuizResponse> quizResponses = service.getAllQuizzesPaged(pageNumber, pageSize, categoryId);
        return ResponseEntity.ok()
                .header("X-Total-Count", String.valueOf(quizResponses.getTotalElements()))
                .header("X-Total-Pages", String.valueOf(quizResponses.getTotalPages()))
                .header("X-Current-Page", String.valueOf(quizResponses.getNumber()))
                .body(quizResponses);
    }

    @GetMapping("/last-quizzes/{categoryId}")
    public ResponseEntity<List<QuizResponse>> getLastQuizzesByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(service.getLastQuizzesByCategory(categoryId));

    }

    @GetMapping("/trends")
    public ResponseEntity<List<QuizResponse>> getTrends() {
        return ResponseEntity.ok(service.getTrends());
    }

    @GetMapping
    ResponseEntity<QuizResponse> getQuiz(@RequestParam("deleteKey") String deleteKey) {
        return ResponseEntity.ok(service.getQuiz(deleteKey));
    }

    @GetMapping("/get-quiz-by-id/{quizId}")
    ResponseEntity<QuizResponse> getQuizById(@PathVariable Long quizId) {
        return ResponseEntity.ok(service.getQuizById(quizId));
    }

    @GetMapping("/search-quiz")
    ResponseEntity<List<QuizResponse>> getSearchedQuizzes(@RequestParam("quizName") String quizName){
        return ResponseEntity.ok(service.getSearchedQuizzes(quizName));
    }

    @PostMapping
    ResponseEntity<QuizResponse> saveQuiz(@RequestBody QuizSaveRequest quiz) {
        return new ResponseEntity<>(service.addQuiz(quiz), HttpStatus.CREATED);
    }

    @PutMapping("/{quizId}")
    void incrementQuizPopularity(@PathVariable Long quizId) {
        service.incrementQuizPopularity(quizId);
    }

    @DeleteMapping
    void deleteQuiz(@RequestParam("deleteKey") String deleteKey) {
        service.deleteQuiz(deleteKey);

    }
}
