package com.sinandemir.quizapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sinandemir.quizapp.dto.request.QuestionSaveRequest;
import com.sinandemir.quizapp.dto.response.QuestionResponse;
import com.sinandemir.quizapp.entities.Question;
import com.sinandemir.quizapp.entities.Quiz;
import com.sinandemir.quizapp.repos.QuestionRepository;
import com.sinandemir.quizapp.repos.QuizRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository repos;
    private final QuizRepository quizRepos;
    private final ModelMapper mapper;

    public List<QuestionResponse> getAllQuestions() {
        List<Question> questions = repos.findAll();
        List<QuestionResponse> res = new ArrayList<QuestionResponse>();

        for (Question question : questions) {
            res.add(new QuestionResponse(question.getId(), question.getQuestionText(), question.getAnswer(),
                    question.getQuiz().getId()));
        }
        return res;
    }

    public QuestionResponse getQuestion(Long questionId) {
        Optional<Question> question = repos.findById(questionId);
        if (question.isPresent()) {
            QuestionResponse res = mapper.map(question.get(), QuestionResponse.class);
            return res;
        }
        throw new RuntimeException("Question bulunamadı -> " + questionId);
    }

    public QuestionResponse saveQuestion(QuestionSaveRequest newQuestion) {
        Optional<Quiz> quiz = quizRepos.findById(newQuestion.getQuizId());
        if (quiz == null)
            return null;
        Question question = mapper.map(newQuestion, Question.class);
        Question savedQuestion = repos.save(question);
        QuestionResponse res = mapper.map(savedQuestion, QuestionResponse.class);
        return res;
    }

    public void deleteQuestion(Long questionId) {
        Optional<Question> question = repos.findById(questionId);
        if (question.isPresent()) {
            repos.deleteById(questionId);
        } else {
            throw new RuntimeException("Geçersiz id -> " + questionId);
        }
    }
}
