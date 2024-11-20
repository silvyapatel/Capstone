package com.example.capstone.capstonebackend.Service;

import com.example.capstone.capstonebackend.Model.User;

import java.util.Set;

public interface UserService {

    // Register a new user
    void registerUser(String email, String password, String username);

    // Get a user by their email
    User getUserByEmail(String email);

    User getUserByUsername(String username);
}

