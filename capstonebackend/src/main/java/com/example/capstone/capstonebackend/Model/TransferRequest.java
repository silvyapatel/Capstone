package com.example.capstone.capstonebackend.Model;

import javax.validation.constraints.NotNull;

public class TransferRequest {
    @NotNull
    private String sourceAccountNumber;
    @NotNull
    private String targetAccountNumber;
    @NotNull
    private Double amount;

    public String getSourceAccountNumber() {
        return sourceAccountNumber;
    }

    public void setSourceAccountNumber(String sourceAccountNumber) {
        this.sourceAccountNumber = sourceAccountNumber;
    }

    public String getTargetAccountNumber() {
        return targetAccountNumber;
    }

    public void setTargetAccountNumber(String targetAccountNumber) {
        this.targetAccountNumber = targetAccountNumber;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    // Getters and Setters
}

