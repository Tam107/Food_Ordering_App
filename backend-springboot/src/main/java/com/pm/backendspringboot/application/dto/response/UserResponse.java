package com.pm.backendspringboot.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private String auth0Id;
    private String addressLine1;
    private String city;
    private String country;

}
