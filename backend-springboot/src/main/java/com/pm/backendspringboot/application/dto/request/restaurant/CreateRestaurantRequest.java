package com.pm.backendspringboot.application.dto.request.restaurant;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateRestaurantRequest {

    @NotNull(message = "Restaurant name is required")
    private String name;

    @NotNull(message = "Restaurant city is required")
    private String city;

    @NotNull(message = "Restaurant country is required")
    private String country;

    @NotNull(message = "Restaurant estimated delivery time is required")
    @Min(value = 0, message = "Estimated delivery time must be greater than 0")
    private Double deliveryPrice;

    @NotNull(message = "Restaurant estimated delivery time is required")
    @Min(value = 0, message = "Estimated delivery time must be greater than 0")
    private Double estimatedDeliveryTime;

    private List<CuisineDTO> cuisines;

    private List<MenuItemDTO> menuItems;

    @NotNull(message = "Restaurant image url is required")
    private String imageUrl;

    public static class CuisineDTO {
        private Long id;
        private String name;
    }

    public static class MenuItemDTO {
        private Long id;
        private String name;
        private Double price;
    }

}
