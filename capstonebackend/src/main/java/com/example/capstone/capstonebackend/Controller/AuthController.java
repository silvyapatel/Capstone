package com.example.capstone.capstonebackend.Controller;

import com.example.capstone.capstonebackend.Model.LoginRequest;
import com.example.capstone.capstonebackend.Model.RegisterRequest;
import com.example.capstone.capstonebackend.Model.User;
import com.example.capstone.capstonebackend.Repository.UserRepository;
import com.example.capstone.capstonebackend.Security.JwtUtil;
import com.example.capstone.capstonebackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    // Endpoint to register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest)
            {

        try {
            userService.registerUser( registerRequest.getUsername(), registerRequest.getEmail(), registerRequest.getPassword());
            return ResponseEntity.ok("Successfull");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Validate user credentials using UserService
            User user = userService.getUserByEmail(loginRequest.getEmail());
            if (user != null && passwordEncoder.matches(loginRequest.getPassword(),
                    user.getPassword())) {  // Use passwordEncoder to compare
                // Generate JWT token
                String token = JwtUtil.generateToken(user);  // Correct, passing the User object to generateToken

                return ResponseEntity.ok(new JwtResponse(token));
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }


    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
class JwtResponse {
    private String token;

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

