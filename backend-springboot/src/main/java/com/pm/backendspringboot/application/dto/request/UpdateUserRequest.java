package com.pm.backendspringboot.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UpdateUserRequest {

    private String name;
    private String auth0Id;
    private String addressLine1;
    private String city;
    private String country;

}
