package com.sinandemir.quizapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionSaveRequest {
    
    String questionText;
    String answer;
    Long quizId;
}
