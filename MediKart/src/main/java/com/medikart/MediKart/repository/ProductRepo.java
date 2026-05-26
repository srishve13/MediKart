package com.medikart.MediKart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medikart.MediKart.entity.Product;
public interface ProductRepo extends JpaRepository<Product, Long>{
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);

}
