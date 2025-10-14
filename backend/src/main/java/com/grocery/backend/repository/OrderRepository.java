package com.grocery.backend.repository;

import com.grocery.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // This method automatically finds all orders for a given customer ID
    List<Order> findByCustomerId(Long customerId);
}




