package com.example.capstone.capstonebackend.Repository;

import com.example.capstone.capstonebackend.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySourceAccount_AccountNumber(String accountNumber); // Correct field path

    List<Transaction> findBySourceAccount_User_Email(String email);
}
