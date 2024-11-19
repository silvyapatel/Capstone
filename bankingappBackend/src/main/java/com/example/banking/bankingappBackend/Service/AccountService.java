package com.example.banking.bankingappBackend.Service;

import com.example.banking.bankingappBackend.Model.Account;
import com.example.banking.bankingappBackend.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> getAccountsByUserId(Long userId) {
        return accountRepository.findByUserId(userId);
    }

    public Account getAccountByAccNum(Long accountNumber) {
        return accountRepository.findById(accountNumber).orElse(null);
    }

    public void deleteAccount(Long accountNumber) {
        accountRepository.deleteById(accountNumber);
    }
}
