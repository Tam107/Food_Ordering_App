package com.pm.backendspringboot.application.user;

import com.pm.backendspringboot.application.dto.request.user.CreateUserRequest;
import com.pm.backendspringboot.application.dto.request.user.UpdateUserRequest;
import com.pm.backendspringboot.application.dto.response.UserResponse;
import com.pm.backendspringboot.domain.user.UserEntity;

public interface UserService {

    UserEntity createUserRequest(CreateUserRequest request);
    UserResponse createUser1(CreateUserRequest request);
    UserResponse getUserById(String auth0Id);
    UserResponse updateUserProfile(String sub, UpdateUserRequest request);
}
