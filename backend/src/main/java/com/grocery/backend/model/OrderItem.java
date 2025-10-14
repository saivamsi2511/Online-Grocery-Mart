package com.grocery.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore // Prevents infinite loops in JSON conversion
    private Order order;

    private Long productId;
    private String productName;
    private int quantity;
    private double price; // Price at time of purchase
}