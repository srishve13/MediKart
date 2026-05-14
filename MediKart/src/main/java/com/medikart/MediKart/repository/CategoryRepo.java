package com.medikart.MediKart.repository;

import com.medikart.MediKart.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoryRepo extends JpaRepository<Category, Long>{

}
