package com.pm.backendspringboot.application.restaurant.impl;

import com.pm.backendspringboot.application.dto.request.restaurant.CreateRestaurantRequest;
import com.pm.backendspringboot.application.dto.request.restaurant.CreateRestaurantResponse;
import com.pm.backendspringboot.application.file.FileService;
import com.pm.backendspringboot.application.restaurant.RestaurantService;
import com.pm.backendspringboot.domain.restaurant.Restaurant;
import com.pm.backendspringboot.domain.user.UserEntity;
import com.pm.backendspringboot.repository.RestaurantRepository;
import com.pm.backendspringboot.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;
    private final FileService fileService;


    @Override
    public CreateRestaurantResponse createRestaurantResponse() {
        return null;
    }


    @Transactional
    public CreateRestaurantResponse createRestaurantResponse(CreateRestaurantRequest request, MultipartFile imageFile, Long userId) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing authenticated user");
        }
        if (restaurantRepository.existsByUserId(userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already has a restaurant");
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        String imageUrl = request.getImageUrl();
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                Map uploadRes = fileService.upload(imageFile, "restaurants");
                Object secureUrl = uploadRes.get("secure_url");
                if (secureUrl != null) {
                    imageUrl = secureUrl.toString();
                }
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed", e);
            }
        } else if (imageUrl == null || imageUrl.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image file or imageUrl is required");
        }

        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setCity(request.getCity());
        restaurant.setCountry(request.getCountry());
        restaurant.setDeliveryPrice(request.getDeliveryPrice());
        restaurant.setEstimatedDeliveryTime(request.getEstimatedDeliveryTime());
        restaurant.setImageUrl(imageUrl);
        restaurant.setUser(user);
        restaurant.setLastUpdated(LocalDateTime.now());

        Restaurant saved = restaurantRepository.save(restaurant);

        return CreateRestaurantResponse.builder()
                .id(String.valueOf(saved.getId()))
                .name(saved.getName())
                .city(saved.getCity())
                .country(saved.getCountry())
                .deliveryPrice(saved.getDeliveryPrice())
                .estimatedDeliveryTime(saved.getEstimatedDeliveryTime())
                .imageUrl(saved.getImageUrl())
                .build();
    }
}

