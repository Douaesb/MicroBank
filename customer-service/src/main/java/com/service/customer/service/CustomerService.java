package com.service.customer.service;

import com.service.customer.DTO.CustomerDTO;

import java.util.List;

public interface CustomerService {

    CustomerDTO saveCustomer(CustomerDTO customerDTO);

    List<CustomerDTO> getAllCustomers();

    CustomerDTO getCustomerById(Long id);
}
