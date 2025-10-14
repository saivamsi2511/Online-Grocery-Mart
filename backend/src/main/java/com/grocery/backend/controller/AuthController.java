package com.grocery.backend.controller;

import com.grocery.backend.model.User;
import com.grocery.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Handles the registration of a new customer.
     * It checks for duplicate usernames and emails before saving.
     * @param newUser The user data sent from the frontend.
     * @return The saved user object on success, or an error message on failure.
     */
    @PostMapping("/customer/register")
    public ResponseEntity<?> registerCustomer(@RequestBody User newUser) {
        // Check 1: Verify if the username is already taken
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT) // 409 Conflict
                    .body("Username is already taken!");
        }

        // Check 2: Verify if the email is already in use
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT) // 409 Conflict
                    .body("Email is already in use!");
        }

        // Set the role and save the new user to the database
        newUser.setRole("customer");
        User savedUser = userRepository.save(newUser);

        // Return the complete user object upon success to allow for auto-login
        return ResponseEntity.ok(savedUser);
    }

    /**
     * Handles the login of an existing customer.
     * @param credentials A map containing the username and password.
     * @return The user object on successful login, or an unauthorized error on failure.
     */
    @PostMapping("/customer/checkcustomerlogin")
    public ResponseEntity<?> loginCustomer(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // IMPORTANT: In a real application, you must compare hashed passwords, not plain text!
            if ("customer".equals(user.getRole()) && user.getPassword().equals(password)) {
                // In a real app, you would generate and return a JWT (JSON Web Token) here
                return ResponseEntity.ok(user);
            }
        }
        
        // If user not found or password/role doesn't match
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
    }
}