package com.example.capstone.capstonebackend.Controller;

import com.example.capstone.capstonebackend.Model.Account;
import com.example.capstone.capstonebackend.Model.AccountReq;
import com.example.capstone.capstonebackend.Model.AccountType;
import com.example.capstone.capstonebackend.Service.AccountService;
import com.example.capstone.capstonebackend.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000/accountsetup", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService accountService;
    private final JwtUtil jwtUtil;  // Inject JwtUtil for token operations

    @Autowired
    public AccountController(AccountService accountService, JwtUtil jwtUtil) {
        this.accountService = accountService;
        this.jwtUtil = jwtUtil;
    }

    // Helper method to extract email from the JWT token in the request header
    private String extractEmailFromToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");  // Get token from the Authorization header
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // Remove "Bearer " prefix
            return jwtUtil.extractUsername(token);  // Extract email from the token
        }
        return null;  // Return null if no token is found or the token is invalid
    }


    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptionsRequest() {
        return ResponseEntity.ok().build(); // Respond with a 200 OK to preflight request
    }
    // Create an account for the user (using email extracted from JWT)
    @PostMapping
    public ResponseEntity<Account> createAccount(HttpServletRequest request, @RequestBody AccountReq accountReq) {
        String email = extractEmailFromToken(request);
        String accountNumber = accountService.generateAccountNumber();
// Get email from the JWT token
        if (email != null) {
            Account createdAccount = accountService.createAccount(email, accountNumber, accountReq);  // Create account using the extracted email
            return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);  // Return created account with status 201
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);  // Token missing or invalid, return 401
        }
    }

    // Get all accounts for a user by email extracted from JWT
    @GetMapping("/user")
    public ResponseEntity<List<Account>> getAccountsByEmail(HttpServletRequest request) {
        String email = extractEmailFromToken(request);  // Extract email from JWT token
        if (email != null) {
            List<Account> accounts = accountService.getAccountsByEmail(email);  // Fetch accounts by email
            return new ResponseEntity<>(accounts, HttpStatus.OK);  // Return accounts with status 200
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);  // Token missing or invalid, return 401
        }
    }

    // Get accounts by account type (e.g., Savings, Checking, Business)
    @GetMapping("/type/{accountType}")
    public ResponseEntity<List<Account>> getAccountsByType(@PathVariable AccountType accountType) {
        List<Account> accounts = accountService.getAccountsByType(accountType);  // Find accounts by account type
        return new ResponseEntity<>(accounts, HttpStatus.OK);  // Return accounts with status 200
    }

    // Get account by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id);  // Get account by ID
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);  // Return account with status 200
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);  // Return 404 if account not found
        }
    }

    // Update account by ID
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account account) {
        Account updatedAccount = accountService.updateAccount(id, account);  // Update account by ID
        if (updatedAccount != null) {
            return new ResponseEntity<>(updatedAccount, HttpStatus.OK);  // Return updated account with status 200
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);  // Return 404 if account not found
        }
    }

    // Delete account by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);  // Delete account by ID
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // Return 204 No Content status
    }
}
