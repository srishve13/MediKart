package com.medikart.MediKart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.medikart.MediKart.entity.OrderItem;
public interface OrderItemRepo extends JpaRepository<OrderItem,Long>,JpaSpecificationExecutor<OrderItem>{

}
