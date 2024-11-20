package com.example.capstone.capstonebackend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class GlobalCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000"); // Allow front-end (React) to access the backend
        config.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, OPTIONS, etc.)
        config.addAllowedHeader("*"); // Allow all headers
        config.setAllowCredentials(true);  // Allow credentials (such as JWT tokens)

        source.registerCorsConfiguration("/**", config);  // Apply CORS configuration globally
        return new CorsFilter(source);
    }
}
