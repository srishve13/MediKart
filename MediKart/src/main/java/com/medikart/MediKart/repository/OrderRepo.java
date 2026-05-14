package com.medikart.MediKart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medikart.MediKart.entity.Order;
public interface OrderRepo extends JpaRepository<Order, Long>{

}
