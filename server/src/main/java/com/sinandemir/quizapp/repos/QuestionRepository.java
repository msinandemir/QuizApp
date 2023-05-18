package com.sinandemir.quizapp.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sinandemir.quizapp.entities.Question;


@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
