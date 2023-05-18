package com.sinandemir.quizapp.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.sinandemir.quizapp.dto.request.QuizSaveRequest;
import com.sinandemir.quizapp.dto.response.QuizResponse;
import com.sinandemir.quizapp.entities.Quiz;
import com.sinandemir.quizapp.repos.QuizRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository repos;
    private final ModelMapper mapper;

    public List<QuizResponse> getAllQuiz() {
        List<Quiz> quizzes = repos.findAll();

        return quizzes.stream().map(quiz -> {
            QuizResponse response = new QuizResponse();
            response.setId(quiz.getId());
            response.setCategory(quiz.getCategory());
            response.setDeleteKey(quiz.getDeleteKey());
            response.setName(quiz.getName());
            response.setPopularity(quiz.getPopularity());
            response.setQuestions(quiz.getQuestions());
            response.setDescription(quiz.getDescription());
            response.setCreatedAt(quiz.getCreatedAt());
            return response;
        }).collect(Collectors.toList());
    }

    public Page<QuizResponse> getAllQuizzesPaged(Integer pageNumber, Integer pageSize, Long categoryId) {
        Page<Quiz> quizzes = repos.findAllByCategoryId(PageRequest.of(
                pageNumber,
                pageSize,
                Sort.by(Sort.Direction.DESC, "createdAt")), categoryId);

        List<QuizResponse> quizResponses = quizzes.stream().map(quiz -> {
            QuizResponse response = new QuizResponse();
            response.setId(quiz.getId());
            response.setName(quiz.getName());
            response.setDescription(quiz.getDescription());
            response.setPopularity(quiz.getPopularity());
            response.setDeleteKey(quiz.getDeleteKey());
            response.setQuestions(quiz.getQuestions());
            response.setCategory(quiz.getCategory());
            response.setCreatedAt(quiz.getCreatedAt());
            return response;
        }).collect(Collectors.toList());

        return new PageImpl<>(quizResponses, PageRequest.of(pageNumber, pageSize), quizzes.getTotalElements());
    }

    public List<QuizResponse> getLastQuizzesByCategory(Long categoryId) {
        List<Quiz> quizzes = repos.getLastQuizzesByCategory(categoryId, PageRequest.of(0, 3));
        return quizzes.stream().map(quiz -> {
            QuizResponse response = new QuizResponse();
            response.setId(quiz.getId());
            response.setName(quiz.getName());
            response.setDescription(quiz.getDescription());
            response.setPopularity(quiz.getPopularity());
            response.setDeleteKey(quiz.getDeleteKey());
            response.setQuestions(quiz.getQuestions());
            response.setCategory(quiz.getCategory());
            response.setCreatedAt(quiz.getCreatedAt());
            return response;
        }).collect(Collectors.toList());
    }

    public List<QuizResponse> getTrends() {
        List<Quiz> trends = repos.getTrends(PageRequest.of(0, 9));
        return trends.stream().map(quiz -> {
            QuizResponse response = new QuizResponse();
            response.setId(quiz.getId());
            response.setName(quiz.getName());
            response.setDescription(quiz.getDescription());
            response.setPopularity(quiz.getPopularity());
            response.setDeleteKey(quiz.getDeleteKey());
            response.setQuestions(quiz.getQuestions());
            response.setCategory(quiz.getCategory());
            response.setCreatedAt(quiz.getCreatedAt());
            return response;
        }).collect(Collectors.toList());
    }

    public List<QuizResponse> getSearchedQuizzes(String quizName) {
        List<Quiz> quizzes = repos.searchQuiz(quizName.toLowerCase(), PageRequest.of(0, 5));
        return quizzes.stream().map(quiz -> {
            QuizResponse response = new QuizResponse();
            response.setId(quiz.getId());
            response.setName(quiz.getName());
            response.setDescription(quiz.getDescription());
            response.setPopularity(quiz.getPopularity());
            response.setDeleteKey(quiz.getDeleteKey());
            response.setQuestions(quiz.getQuestions());
            response.setCategory(quiz.getCategory());
            response.setCreatedAt(quiz.getCreatedAt());
            return response;
        }).collect(Collectors.toList());
    }

    public QuizResponse getQuiz(String deleteKey) {
        Optional<Quiz> quiz = repos.findByDeleteKey(deleteKey);
        if (quiz.isPresent()) {
            QuizResponse res = mapper.map(quiz.get(), QuizResponse.class);
            return res;
        }
        throw new RuntimeException("Quiz bulunamadı -> " + deleteKey);
    }

    public QuizResponse getQuizById(Long quizId) {
        Optional<Quiz> quiz = repos.findById(quizId);
        if (quiz.isPresent()) {
            QuizResponse res = mapper.map(quiz.get(), QuizResponse.class);
            return res;
        }
        throw new RuntimeException("Quiz bulunamadı -> " + quizId);
    }

    public QuizResponse addQuiz(QuizSaveRequest newQuiz) {
        Quiz quiz = mapper.map(newQuiz, Quiz.class);
        Quiz savedQuiz = repos.save(quiz);
        QuizResponse res = mapper.map(savedQuiz, QuizResponse.class);
        return res;
    }

    public void incrementQuizPopularity(Long quizId) {
        Quiz quiz = repos.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found -> " + quizId));
        quiz.setPopularity(quiz.getPopularity() + 1);
        repos.save(quiz);
    }

    public void deleteQuiz(String deleteKey) {
        Optional<Quiz> quiz = repos.findByDeleteKey(deleteKey);
        if (quiz.isPresent()) {
            repos.deleteById(quiz.get().getId());
        }
    }

}
