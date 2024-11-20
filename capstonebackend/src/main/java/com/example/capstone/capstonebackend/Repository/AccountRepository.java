package com.example.capstone.capstonebackend.Repository;

import com.example.capstone.capstonebackend.Model.Account;
import com.example.capstone.capstonebackend.Model.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserEmail(String email);  // Find accounts by user's email
    List<Account> findByAccountType(AccountType accountType); // Find accounts by account type
    Account findByAccountNumber(String AccountNumber);
    List<Account> findByUserId(Long id);
}
