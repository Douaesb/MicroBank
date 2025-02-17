package com.service.account.mapper;


import com.service.account.DTO.AccountDTO;
import com.service.account.DTO.CreateAccountDTO;
import com.service.account.model.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountDTO toDTO(Account account);

    @Mapping(target = "id", ignore = true)
    Account fromCreateDTO(CreateAccountDTO createAccountDTO);
}
