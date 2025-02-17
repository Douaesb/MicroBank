package com.service.account.controller;

import com.service.account.DTO.AccountDTO;
import com.service.account.DTO.CreateAccountDTO;
import com.service.account.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AccountDTO> createAccount(@Valid @RequestBody CreateAccountDTO createAccountDTO) {
        return ResponseEntity.ok(service.createAccount(createAccountDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> getAccount(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAccountById(id));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AccountDTO>> getAccountsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(service.getAccountsByCustomerId(customerId));
    }
}

