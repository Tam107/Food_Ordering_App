package com.foodorderingapp.dto.response;

import com.foodorderingapp.domain.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String auth0Id;
    private String email;
    private String name;
    private String addressLine1;
    private String city;
    private String country;
    private Long restaurantId;

    public static UserResponse from(UserEntity entity) {
        if (entity == null) {
            return null;
        }
        Long restaurantId = entity.getRestaurants() != null ? entity.getRestaurants().getId() : null;
        return UserResponse.builder()
                .id(entity.getId())
                .auth0Id(entity.getAuth0Id())
                .email(entity.getEmail())
                .name(entity.getName())
                .addressLine1(entity.getAddressLine1())
                .city(entity.getCity())
                .country(entity.getCountry())
                .restaurantId(restaurantId)
                .build();
    }
}
