package com.service.customer;

import com.service.customer.DTO.CustomerDTO;
import com.service.customer.exception.CustomerNotFoundException;
import com.service.customer.mapper.CustomerMapper;
import com.service.customer.model.Customer;
import com.service.customer.repository.CustomerRepository;
import com.service.customer.service.impl.CustomerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @Mock
    private CustomerRepository repository;

    @Mock
    private CustomerMapper mapper;

    @InjectMocks
    private CustomerServiceImpl service;

    private Customer customer;
    private CustomerDTO customerDTO;

    @BeforeEach
    void setUp() {
        customer = new Customer();
        customer.setId(1L);
        customer.setName("John Doe");
        customer.setEmail("john@example.com");

        customerDTO = new CustomerDTO();
        customerDTO.setId(1L);
        customerDTO.setName("John Doe");
        customerDTO.setEmail("john@example.com");
    }

    @Test
    void testSaveCustomer_Success() {
        when(mapper.toCustomer(customerDTO)).thenReturn(customer);
        when(repository.save(customer)).thenReturn(customer);
        when(mapper.toCustomerDTO(customer)).thenReturn(customerDTO);

        CustomerDTO savedCustomer = service.saveCustomer(customerDTO);

        assertNotNull(savedCustomer);
        assertEquals("John Doe", savedCustomer.getName());
        assertEquals("john@example.com", savedCustomer.getEmail());

        verify(repository, times(1)).save(customer);
        verify(mapper, times(1)).toCustomerDTO(customer);
    }

    @Test
    void testGetAllCustomers_Success() {
        List<Customer> customerList = Arrays.asList(customer);
        List<CustomerDTO> customerDTOList = Arrays.asList(customerDTO);

        when(repository.findAll()).thenReturn(customerList);
        when(mapper.toCustomerDTOs(customerList)).thenReturn(customerDTOList);

        List<CustomerDTO> result = service.getAllCustomers();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getName());

        verify(repository, times(1)).findAll();
        verify(mapper, times(1)).toCustomerDTOs(customerList);
    }

    @Test
    void testGetCustomerById_Success() {
        when(repository.findById(1L)).thenReturn(Optional.of(customer));
        when(mapper.toCustomerDTO(customer)).thenReturn(customerDTO);

        CustomerDTO result = service.getCustomerById(1L);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());

        verify(repository, times(1)).findById(1L);
        verify(mapper, times(1)).toCustomerDTO(customer);
    }

    @Test
    void testGetCustomerById_CustomerNotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(CustomerNotFoundException.class, () -> service.getCustomerById(1L));

        assertEquals("Customer with ID 1 not found.", exception.getMessage());

        verify(repository, times(1)).findById(1L);
        verify(mapper, never()).toCustomerDTO(any());
    }
}
