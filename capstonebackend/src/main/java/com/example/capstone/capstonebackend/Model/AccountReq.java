package com.example.capstone.capstonebackend.Model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class AccountReq {
    private Double balance;        // Balance in the account

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }
}
