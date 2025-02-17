package com.service.customer.service.impl;

import com.service.customer.DTO.CustomerDTO;
import com.service.customer.exception.CustomerNotFoundException;
import com.service.customer.mapper.CustomerMapper;
import com.service.customer.model.Customer;
import com.service.customer.repository.CustomerRepository;
import com.service.customer.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository repository;
    private CustomerMapper mapper;

    public CustomerServiceImpl(CustomerRepository repository, CustomerMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        Customer customer = mapper.toCustomer(customerDTO);
        return mapper.toCustomerDTO(repository.save(customer));
    }

    public List<CustomerDTO> getAllCustomers() {
        return mapper.toCustomerDTOs(repository.findAll());
    }

    public CustomerDTO getCustomerById(Long id) {
        return repository.findById(id)
                .map(mapper::toCustomerDTO)
                .orElseThrow(() -> new CustomerNotFoundException(id));
    }
}
