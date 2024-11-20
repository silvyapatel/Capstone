package com.example.capstone.capstonebackend.Service;

import com.example.capstone.capstonebackend.Model.Account;
import com.example.capstone.capstonebackend.Model.Transaction;
import com.example.capstone.capstonebackend.Repository.AccountRepository;
import com.example.capstone.capstonebackend.Repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Transactional
    public Transaction deposit(String accountNumber, Double amount) {
        Account account = accountRepository.findByAccountNumber(accountNumber);
        if (account == null) {
            System.out.println("Account not found for account number: " + accountNumber);
            throw new RuntimeException("Account not found");
        }

        // Debugging
        System.out.println("Account found: " + account);

        account.setBalance(account.getBalance() + amount);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setType("DEPOSIT");
        transaction.setAmount(amount);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setSourceAccount(account);

        System.out.println("Saving transaction: " + transaction);
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction withdraw(String accountNumber, Double amount, String userEmail) {
        Account account = accountRepository.findByAccountNumber(accountNumber);
        if (account == null) {
            throw new RuntimeException("Account not found");
        }

        // Validate ownership
        if (!account.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized withdrawal: You do not own this account");
        }

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(account.getBalance() - amount);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setType("WITHDRAWAL");
        transaction.setAmount(amount);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setSourceAccount(account);

        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction transfer(String sourceAccountNumber, String targetAccountNumber, Double amount) {
        Account sourceAccount = accountRepository.findByAccountNumber(sourceAccountNumber);
        if (sourceAccount == null) {
            throw new RuntimeException("Source Account not found");
        }
        Account targetAccount = accountRepository.findByAccountNumber(targetAccountNumber);
        if (targetAccount == null) {
            throw new RuntimeException("Target Account not found");
        }

        if (sourceAccount.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        sourceAccount.setBalance(sourceAccount.getBalance() - amount);
        targetAccount.setBalance(targetAccount.getBalance() + amount);

        accountRepository.save(sourceAccount);
        accountRepository.save(targetAccount);

        Transaction transaction = new Transaction();
        transaction.setType("TRANSFER");
        transaction.setAmount(amount);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setSourceAccount(sourceAccount);
        transaction.setTargetAccount(targetAccount);

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByAccount(String accountNumber) {
        return transactionRepository.findBySourceAccount_AccountNumber(accountNumber);
    }

    public List<Transaction> getTransactionsByUser(String userEmail) {
        // Find all accounts linked to the userEmail
        return transactionRepository.findBySourceAccount_User_Email(userEmail);
    }
}
