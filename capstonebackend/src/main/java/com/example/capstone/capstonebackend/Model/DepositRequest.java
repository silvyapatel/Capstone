package com.example.capstone.capstonebackend.Model;

import javax.validation.constraints.NotNull;

public class DepositRequest {

    @NotNull(message = "Account number is required")
    private String accountNumber;

    @NotNull(message = "Amount is required")
    private Double amount;

    // Getters and setters

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
