package com.foodorderingapp.service;

import com.foodorderingapp.dto.response.UserResponse;
import com.foodorderingapp.domain.UserEntity;

import java.util.Optional;

public interface UserService {

    Optional<UserEntity> getUser(Long id);

    Optional<UserEntity> getUserByAuth0Id(String auth0Id);

    UserResponse createUser(UserEntity userEntity);

    UserResponse updateUser(Long id);
}
