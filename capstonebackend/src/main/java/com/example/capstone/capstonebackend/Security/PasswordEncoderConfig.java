//package com.example.capstone.capstonebackend.Security;
//
//import com.example.capstone.capstonebackend.Model.User;
//import com.example.capstone.capstonebackend.Repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//public class PasswordEncoderConfig {
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public void registerUser(String email, String rawPassword) {
//        String encodedPassword = passwordEncoder.encode(rawPassword);
//        User user = new User();
//        user.setEmail(email);
//        user.setPassword(encodedPassword);
//        // Set roles and save the user to the database
//        UserRepository.save(user);
//    }
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();  // BCrypt hashing
//    }
//}
//
//
