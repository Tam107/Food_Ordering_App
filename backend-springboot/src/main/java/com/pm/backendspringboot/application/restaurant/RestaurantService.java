package com.pm.backendspringboot.application.restaurant;

import com.pm.backendspringboot.application.dto.request.restaurant.CreateRestaurantRequest;
import com.pm.backendspringboot.application.dto.request.restaurant.CreateRestaurantResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface RestaurantService {

    CreateRestaurantResponse createRestaurantResponse(CreateRestaurantRequest request, MultipartFile file, String userId) throws IOException;
}
