package com.example.capstone.capstonebackend.Model;


import jakarta.persistence.*;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNumber;  // Account number (e.g., "123456")
    private Double balance;        // Balance in the account

    @Enumerated(EnumType.STRING)
    private AccountType accountType; // Enum for account type

    @ManyToOne
    @JoinColumn(name = "user_id")  // Foreign key column to link the user
    private User user;  // Many accounts can belong to one user

    // Constructors, getters, and setters

    public Account() {}

    public Account(String accountNumber, Double balance, AccountType accountType, User user) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.accountType = accountType;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
