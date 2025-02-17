package com.service.account.repository;

import com.service.account.model.Account;
import com.service.account.model.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByClientId(Long customerId);
    boolean existsByClientIdAndType(Long clientId, AccountType type);

}