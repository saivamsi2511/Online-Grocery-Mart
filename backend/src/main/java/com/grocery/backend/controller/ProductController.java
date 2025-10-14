package com.grocery.backend.controller;

import com.grocery.backend.model.Product;
import com.grocery.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/viewallproducts")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}