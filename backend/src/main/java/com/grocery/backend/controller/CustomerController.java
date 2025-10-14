package com.grocery.backend.controller;

import com.grocery.backend.model.Order;
import com.grocery.backend.model.User;
import com.grocery.backend.repository.OrderRepository;
import com.grocery.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository; // Inject the OrderRepository

    @GetMapping("/{id}")
    public ResponseEntity<User> getCustomerProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // NEW ENDPOINT to fetch orders for a specific customer
    @GetMapping("/{id}/orders")
    public ResponseEntity<List<Order>> getCustomerOrders(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        List<Order> orders = orderRepository.findByCustomerId(id);
        return ResponseEntity.ok(orders);
    }
}