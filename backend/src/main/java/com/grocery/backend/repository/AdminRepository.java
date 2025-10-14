package com.grocery.backend.repository; // ✅ FIX: Correct package declaration

import com.grocery.backend.model.Admin; // ✅ FIX: Correct import for Admin class
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    // This method allows you to find an admin by their username
    Optional<Admin> findByUsername(String username);
}