package com.service.account.service;


import com.service.account.DTO.AccountDTO;
import com.service.account.DTO.CreateAccountDTO;

import java.util.List;

public interface AccountService {

    AccountDTO createAccount(CreateAccountDTO createAccountDTO);
    AccountDTO getAccountById(Long id);
    List<AccountDTO> getAccountsByCustomerId(Long customerId);
}
