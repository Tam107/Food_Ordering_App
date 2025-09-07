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
    public CreateRestaurantResponse createRestaurantResponse(CreateRestaurantRequest request, MultipartFile file, String userId) throws IOException {
        UserEntity user = userRepository.findByAuth0Id(userId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.UNAUTHORIZED,"User not found")
        );

        if (restaurantRepository.existsByUserId(user.getId())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"User already exists restaurant");
        }
        String imgUrl = fileService.upload(file);

        Restaurant restaurant = new Restaurant();
        // todo implement dto mapping

        return null;
    }
}

