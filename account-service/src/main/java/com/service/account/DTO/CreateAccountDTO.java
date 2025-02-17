package com.service.account.DTO;

import com.service.account.model.AccountType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountDTO {

    @NotNull(message = "Balance is required.")
    @Min(value = 0, message = "Balance must be at least 0.")
    private Double balance;

    @NotNull(message = "Account type is required.")
    private AccountType type;

    @NotNull(message = "Client ID is required.")
    private Long clientId;
}
