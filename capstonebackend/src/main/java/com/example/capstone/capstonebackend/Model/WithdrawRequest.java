package com.example.capstone.capstonebackend.Model;

import javax.validation.constraints.NotNull;

public class WithdrawRequest {
    @NotNull
    private String accountNumber;
    @NotNull
    private Double amount;
    @NotNull
    private String userEmail;

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

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    // Getters and Setters
}
