package com.service.account;


import com.service.account.DTO.AccountDTO;
import com.service.account.DTO.CreateAccountDTO;
import com.service.account.exception.CustomerNotFoundException;
import com.service.account.mapper.AccountMapper;
import com.service.account.model.Account;
import com.service.account.model.AccountType;
import com.service.account.repository.AccountRepository;
import com.service.account.service.impl.AccountServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccountServiceTest {

    @Mock
    private AccountRepository repository;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private AccountMapper mapper;

    @InjectMocks
    private AccountServiceImpl accountService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateAccount_Success() {
        // Arrange
        CreateAccountDTO createAccountDTO = new CreateAccountDTO(1.0, AccountType.COURANT, 1000L);
        Account account = new Account(1L, 1000.0, AccountType.COURANT, 1L);
        AccountDTO accountDTO = new AccountDTO(1L, 1000.0, AccountType.COURANT, 1L);

        when(restTemplate.getForEntity(anyString(), eq(Object.class)))
                .thenReturn(new ResponseEntity<>(HttpStatus.OK));

        when(repository.existsByClientIdAndType(1L, AccountType.COURANT)).thenReturn(false);
        when(mapper.fromCreateDTO(createAccountDTO)).thenReturn(account);
        when(repository.save(account)).thenReturn(account);
        when(mapper.toDTO(account)).thenReturn(accountDTO);

        // Act
        AccountDTO result = accountService.createAccount(createAccountDTO);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getClientId());
        assertEquals(AccountType.COURANT, result.getType());
    }

    @Test
    void testCreateAccount_CustomerNotFound() {
        // Arrange
        CreateAccountDTO createAccountDTO = new CreateAccountDTO(200.0, AccountType.EPARGNE, 5L);

        when(restTemplate.getForEntity(anyString(), eq(Object.class)))
                .thenReturn(new ResponseEntity<>(HttpStatus.NOT_FOUND));

        // Act & Assert
        assertThrows(CustomerNotFoundException.class, () -> accountService.createAccount(createAccountDTO));
    }

    @Test
    void testGetAccountById_Success() {
        // Arrange
        Account account = new Account(1L, 3000.0, AccountType.EPARGNE, 1L);
        AccountDTO accountDTO = new AccountDTO(1L, 3000.0, AccountType.EPARGNE, 1L);

        when(repository.findById(1L)).thenReturn(Optional.of(account));
        when(mapper.toDTO(account)).thenReturn(accountDTO);

        // Act
        AccountDTO result = accountService.getAccountById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(AccountType.EPARGNE, result.getType());
    }

    @Test
    void testGetAccountById_NotFound() {
        // Arrange
        when(repository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> accountService.getAccountById(99L));
        assertEquals("Account not found with ID: 99", exception.getMessage());
    }

    @Test
    void testGetAccountsByCustomerId() {
        // Arrange
        Account account1 = new Account(1L, 4000.0, AccountType.COURANT, 5L);
        Account account2 = new Account(2L, 2500.0, AccountType.EPARGNE, 5L);

        AccountDTO dto1 = new AccountDTO(1L, 4000.0, AccountType.COURANT, 5L);
        AccountDTO dto2 = new AccountDTO(2L, 2500.0, AccountType.EPARGNE, 5L);

        when(repository.findByClientId(5L)).thenReturn(List.of(account1, account2));
        when(mapper.toDTO(account1)).thenReturn(dto1);
        when(mapper.toDTO(account2)).thenReturn(dto2);

        // Act
        List<AccountDTO> result = accountService.getAccountsByCustomerId(5L);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(5L, result.get(0).getClientId());
    }
}
