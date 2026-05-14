package com.medikart.MediKart.service.interf;

import java.time.LocalDateTime;

import org.springframework.data.domain.Pageable;

import com.medikart.MediKart.dto.OrderRequest;
import com.medikart.MediKart.dto.Response;
import com.medikart.MediKart.entity.Order;
import com.medikart.MediKart.enums.OrderStatus;
public interface OrderItemService {
    Response placeOrder(OrderRequest orderRequest);
    Response updateOrderItemStatus(Long orderItemId, String status);
    Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable);

    Order findOrderById(Long orderId);

}
