package com.example.capstone.capstonebackend.Model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    private String email;
    private String password;
    private String username;

    // Constructor to build CustomUserDetails from a User entity
    public CustomUserDetails(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.username = user.getUsername();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; // The username for Spring Security authentication
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Assume account is not expired, could add more logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Assume account is not locked, could add more logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Assume credentials are not expired, could add more logic
    }

    @Override
    public boolean isEnabled() {
        return true; // Assume user is always enabled, could add more logic
    }
}
