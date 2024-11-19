package com.example.capstone.capstonebackend.Security;

import com.example.capstone.capstonebackend.Service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    // Bean for password encoding (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // BCrypt password encoding
    }

    // Security filter chain configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors()
                .and()// Disable CSRF (common for stateless APIs)
                .authorizeHttpRequests()
                // Use requestMatchers instead of antMatchers (Spring Security 6+)
                .requestMatchers("/auth/register", "/auth/login","/accounts/** ").permitAll()  // Allow register and login without authentication
                .anyRequest().authenticated()  // All other requests need authentication
                .and()
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter before Spring Security filter

        return http.build(); // Return the SecurityFilterChain
    }

    // AuthenticationManager bean (needed for AuthenticationController)
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        // Use CustomUserDetailsService to load user details
        authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());

        return authenticationManagerBuilder.build();
    }
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow requests from your frontend URL (localhost:3000)
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));  // Allow frontend to access the backend
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));  // Allow specific HTTP methods
        config.setAllowedHeaders(Arrays.asList("*"));  // Allow all headers
        config.setAllowCredentials(true);  // Allow sending credentials (like JWT)

        source.registerCorsConfiguration("/**", config);  // Apply the CORS configuration globally
        return source;
    }

}
