package com.sinandemir.quizapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponse {
    Long id;
    String questionText;
    String answer;
    Long quizId;
}
