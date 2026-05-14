package com.medikart.MediKart.repository;

import java.util.List;

import com.medikart.MediKart.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepo extends JpaRepository<Product, Long>{
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContainingOrDescriptionContaining(String name, String description);

}
