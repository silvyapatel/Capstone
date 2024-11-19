package com.example.banking.bankingappBackend.Repository;

import com.example.banking.bankingappBackend.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(Long userId);
}
