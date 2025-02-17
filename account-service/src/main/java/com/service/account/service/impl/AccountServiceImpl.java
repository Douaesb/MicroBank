package com.service.account.service.impl;

import com.service.account.DTO.AccountDTO;
import com.service.account.DTO.CreateAccountDTO;
import com.service.account.exception.CustomerNotFoundException;
import com.service.account.mapper.AccountMapper;
import com.service.account.model.Account;
import com.service.account.repository.AccountRepository;
import com.service.account.service.AccountService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository repository;
    private final RestTemplate restTemplate;
    private final AccountMapper mapper;

    public AccountServiceImpl(AccountRepository repository, RestTemplate restTemplate, AccountMapper mapper) {
        this.repository = repository;
        this.restTemplate = restTemplate;
        this.mapper = mapper;
    }

    public AccountDTO createAccount(CreateAccountDTO createAccountDTO) {
        String customerServiceUrl = "http://CUSTOMER-SERVICE/customers/" + createAccountDTO.getClientId();
        var response = restTemplate.getForEntity(customerServiceUrl, Object.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new CustomerNotFoundException(createAccountDTO.getClientId());
        }
        boolean accountExists = repository.existsByClientIdAndType(createAccountDTO.getClientId(), createAccountDTO.getType());
        if (accountExists) {
            throw new RuntimeException("Client already has a " + createAccountDTO.getType() + " account.");
        }

        Account account = mapper.fromCreateDTO(createAccountDTO);
        return mapper.toDTO(repository.save(account));
    }

    public AccountDTO getAccountById(Long id) {
        return repository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Account not found with ID: " + id));
    }

    public List<AccountDTO> getAccountsByCustomerId(Long customerId) {
        return repository.findByClientId(customerId)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }
}
