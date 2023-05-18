package com.sinandemir.quizapp.dto.response;

import java.util.Date;
import java.util.List;

import com.sinandemir.quizapp.entities.Category;
import com.sinandemir.quizapp.entities.Question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizResponse {
     
   private Long id;
   private String name;
   private String description;
   private Integer popularity;
   private String deleteKey;
   private List<Question> questions;
   private Category category;
   private Date createdAt;
}
