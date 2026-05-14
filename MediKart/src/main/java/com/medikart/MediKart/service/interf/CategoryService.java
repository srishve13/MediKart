package com.medikart.MediKart.service.interf;

import com.medikart.MediKart.dto.CategoryDto;
import com.medikart.MediKart.dto.Response;
public interface CategoryService {
    Response createCategory(CategoryDto categoryRequest);
    Response updateCategory(Long categoryId, CategoryDto categoryRequest);
    Response getAllCategories();
    Response getCategoryById(Long categoryId);
    Response deleteCategory(Long categoryId);

}
