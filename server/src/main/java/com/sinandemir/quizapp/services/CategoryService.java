package com.sinandemir.quizapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sinandemir.quizapp.dto.request.CategorySaveRequest;
import com.sinandemir.quizapp.dto.response.CategoryResponse;
import com.sinandemir.quizapp.entities.Category;
import com.sinandemir.quizapp.repos.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repos;
    private final ModelMapper mapper;

    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = repos.findAll();
        List<CategoryResponse> response = new ArrayList<CategoryResponse>();

        for (Category category : categories) {
            response.add(new CategoryResponse(category.getId(), category.getCategory()));

        }
        return response;
    }

    public CategoryResponse getCategory(Long id) {
        Optional<Category> category = repos.findById(id);
        
        if (category.isPresent()) {
            CategoryResponse res = mapper.map(category.get(), CategoryResponse.class);
            return res;
        }
        throw new RuntimeException("Category bulunamadı -> " + id);
    }

    public CategoryResponse addCategory(CategorySaveRequest newCategory) {
        Category category = mapper.map(newCategory, Category.class);
        Category savedCategory = repos.save(category);
        CategoryResponse res = mapper.map(savedCategory, CategoryResponse.class);
        return res;
    }

}
