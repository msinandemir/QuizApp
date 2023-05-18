package com.sinandemir.quizapp.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinandemir.quizapp.dto.request.CategorySaveRequest;
import com.sinandemir.quizapp.dto.response.CategoryResponse;
import com.sinandemir.quizapp.services.CategoryService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/categories")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @GetMapping
    ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(service.getAllCategories());
    }

    @GetMapping("/{categoryId}")
    ResponseEntity<CategoryResponse> getCategory(@PathVariable Long categoryId) {

        return ResponseEntity.ok(service.getCategory(categoryId));
    }

    @PostMapping
    ResponseEntity<CategoryResponse> saveCategory(@RequestBody CategorySaveRequest category) {
        return new ResponseEntity<CategoryResponse>(service.addCategory(category), HttpStatus.CREATED);
    }
}
