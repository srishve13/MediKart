package com.medikart.MediKart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medikart.MediKart.entity.User;
public interface UserRepo extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
}
