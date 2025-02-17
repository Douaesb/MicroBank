package com.service.account.DTO;



import com.service.account.model.AccountType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDTO {
    private Long id;
    private Double balance;
    private AccountType type;
    private Long clientId;
}
