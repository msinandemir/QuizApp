package com.sinandemir.quizapp.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.sinandemir.quizapp.entities.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Optional<Quiz> findByDeleteKey(String deleteKey);

    @Query("SELECT q FROM Quiz q WHERE q.category.id = :categoryId ORDER BY q.createdAt DESC")
    List<Quiz> getLastQuizzesByCategory(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query("SELECT q FROM Quiz q ORDER BY q.popularity DESC")
    List<Quiz> getTrends(Pageable pageable);

    @Query("SELECT q FROM Quiz q WHERE LOWER(q.name) LIKE %:quizName%")
    List<Quiz> searchQuiz(@Param("quizName") String quizName, Pageable pageable);

    Page<Quiz> findAllByCategoryId(PageRequest of, Long categoryId);
}
