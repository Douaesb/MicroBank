package com.service.customer.mapper;

import com.service.customer.DTO.CustomerDTO;
import com.service.customer.model.Customer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    CustomerDTO toCustomerDTO(Customer customer);
    Customer toCustomer(CustomerDTO customerDTO);
    List<CustomerDTO> toCustomerDTOs(List<Customer> customers);
}
