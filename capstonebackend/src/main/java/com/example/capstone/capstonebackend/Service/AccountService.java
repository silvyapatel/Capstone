package com.example.capstone.capstonebackend.Service;

import com.example.capstone.capstonebackend.Model.Account;
import com.example.capstone.capstonebackend.Model.AccountReq;
import com.example.capstone.capstonebackend.Model.AccountType;
import com.example.capstone.capstonebackend.Repository.AccountRepository;
import com.example.capstone.capstonebackend.Model.User;
import com.example.capstone.capstonebackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;  // To retrieve the user

    @Autowired
    public AccountService(AccountRepository accountRepository, UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }
    public String generateAccountNumber() {
        // Example logic: prefix + timestamp + random digits
        String prefix = "ACC";
        long timestamp = System.currentTimeMillis();
        int random = (int)(Math.random() * 1000);
        return prefix + timestamp + random;
    }


    public Account createAccount(String email, String AccountNUmber, AccountReq accountReq) {
        // Find the user by email
        Account account = new Account();

        User user = userRepository.findByEmail(email);

        // Check if the user exists, and if not, throw an exception or return null
        if (user == null) {
            throw new RuntimeException("User with email " + email + " not found");
        }
        account.setAccountNumber(AccountNUmber);
        account.setUser(user);  // Set the user for the account
        account.setAccountType(accountReq.getAccountType());
        account.setBalance(accountReq.getBalance());
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();  // Return all accounts
    }

    public List<Account> getAccountsByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User with email " + email + " not found");
        }
        return accountRepository.findByUserId(user.getId());
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);  // Return account by ID or null if not found
    }

    public List<Account> getAccountsByType(AccountType accountType) {
        return accountRepository.findByAccountType(accountType);  // Find accounts by account type
    }

    public Account updateAccount(Long id, Account account) {
        if (accountRepository.existsById(id)) {
            account.setId(id);
            return accountRepository.save(account);  // Update account by ID
        }
        return null;
    }

    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);  // Delete account by ID
    }
}
