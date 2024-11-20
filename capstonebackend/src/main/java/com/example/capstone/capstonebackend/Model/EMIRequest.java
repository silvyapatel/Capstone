package com.example.capstone.capstonebackend.Model;

public class EMIRequest {
    private double loanAmount;
    private double interestRate; // Annual Interest Rate
    private int loanTenure; // Loan tenure in months

    // Getters and Setters
    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public int getLoanTenure() {
        return loanTenure;
    }

    public void setLoanTenure(int loanTenure) {
        this.loanTenure = loanTenure;
    }
}
