package com.sinandemir.quizapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizSaveRequest {
    
    private String name;
    private String description;
    private Long categoryId;
}
