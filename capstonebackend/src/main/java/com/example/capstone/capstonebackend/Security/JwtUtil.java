package com.example.capstone.capstonebackend.Security;

import com.example.capstone.capstonebackend.Model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // Generate a secure 256-bit secret key for HS256 algorithm
    private static final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);  // Automatically 256 bits

    // Generate JWT token
    public static String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())  // Set email as the subject
                .setIssuedAt(new Date())  // Set the issued date
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiry
                .signWith(secretKey)  // Sign with the 256-bit secret key
                .compact();  // Return the generated token
    }

    // Extract the username (subject) from the JWT token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();  // Extract subject (username) from token claims
    }


    // Extract the expiration date from the JWT token
    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration(); // Get expiration from claims
    }

    // Extract claims (subject, expiration, etc.) from the token
    private Claims extractClaims(String token) {
        return Jwts.parser()  // Use the new parserBuilder() method in jjwt 0.11+
                .setSigningKey(secretKey)  // Set the signing key to the 256-bit key
                .build()  // Build the parser
                .parseClaimsJws(token)     // Parse the JWT and get claims
                .getBody();  // Return claims
    }

    // Check if the JWT token is expired
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());  // Compare expiration date with current date
    }

    // Validate the JWT token by checking username and expiration
    public boolean validateToken(String token, String username) {
        String tokenUsername = extractUsername(token);  // Extract the username from the token
        return (tokenUsername.equals(username) && !isTokenExpired(token));  // Check if username matches and token is valid
    }
}
