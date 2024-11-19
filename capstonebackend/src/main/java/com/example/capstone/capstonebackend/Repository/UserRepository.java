package com.example.capstone.capstonebackend.Repository;

import com.example.capstone.capstonebackend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Find a user by email (or username, depending on your authentication logic)
    User findByEmail(String email);

    User findByUsername(String username);

    boolean existsByUsername(String username);
}

