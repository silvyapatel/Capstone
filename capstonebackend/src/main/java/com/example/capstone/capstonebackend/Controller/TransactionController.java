package com.example.capstone.capstonebackend.Controller;

import com.example.capstone.capstonebackend.Model.DepositRequest;
import com.example.capstone.capstonebackend.Model.Transaction;
import com.example.capstone.capstonebackend.Model.TransferRequest;
import com.example.capstone.capstonebackend.Model.WithdrawRequest;
import com.example.capstone.capstonebackend.Security.JwtUtil;
import com.example.capstone.capstonebackend.Service.TransactionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http://localhost:3000/transactions", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    private final JwtUtil jwtUtil;

    public TransactionController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    private String extractEmailFromToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // Remove "Bearer " prefix
            return jwtUtil.extractUsername(token);  // Extract email from the token
        }
        return null;  // Return null if no token is found or the token is invalid
    }


    @PostMapping("/deposit")
    public ResponseEntity<Transaction> deposit(@Valid @RequestBody DepositRequest request) {
        Transaction transaction = transactionService.deposit(request.getAccountNumber(), request.getAmount());
        System.out.println("Transaction to return: " + transaction);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Transaction> withdraw(@Valid @RequestBody WithdrawRequest request) {
        Transaction transaction = transactionService.withdraw(request.getAccountNumber(), request.getAmount(), request.getUserEmail());
        System.out.println("Transaction to return: " + transaction);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/transfer")
    public ResponseEntity<Transaction> transfer(@Valid @RequestBody TransferRequest request) {
        Transaction transaction = transactionService.transfer(
                request.getSourceAccountNumber(),
                request.getTargetAccountNumber(),
                request.getAmount()
        );
        System.out.println("Transaction to return: " + transaction);
        return ResponseEntity.ok(transaction);
    }

    @GetMapping("/{accountNumber}")
    public ResponseEntity<List<Transaction>> getTransactionsByAccount(@PathVariable String accountNumber) {
        List<Transaction> transactions = transactionService.getTransactionsByAccount(accountNumber);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Transaction>> getTransactionsByUser(HttpServletRequest httpServletRequest) {
        String userEmail = extractEmailFromToken(httpServletRequest);
        if (userEmail == null) {
            return ResponseEntity.status(401).body(null);  // Unauthorized if no email can be extracted from token
        }

        List<Transaction> transactions = transactionService.getTransactionsByUser(userEmail);
        return ResponseEntity.ok(transactions);
    }
}
