package com.sinandemir.quizapp.entities;


import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quizzes")
public class Quiz {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quiz_name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "popularity", columnDefinition = "int default 0")
    private int popularity;

    @Column(name = "delete_key", unique = true)
    private String deleteKey = UUID.randomUUID().toString();

    @Column(name = "created_at")
    private Date createdAt = new Date();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "quiz")
    @JsonIgnore
    private List<Question> questions;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;
}
