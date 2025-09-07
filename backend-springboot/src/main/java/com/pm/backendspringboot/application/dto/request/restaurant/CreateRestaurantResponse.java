package com.pm.backendspringboot.application.dto.request.restaurant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateRestaurantResponse {

    private String id;
    private String name;
    private String city;
    private String country;
    private Double deliveryPrice;
    private Double estimatedDeliveryTime;
    private List<CuisineDTO> cuisines;
    private List<MenuItemDTO> menuItems;
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
