package com.pm.backendspringboot.application.user.impl;

import com.pm.backendspringboot.application.dto.request.CreateUserRequest;
import com.pm.backendspringboot.application.dto.request.UpdateUserRequest;
import com.pm.backendspringboot.application.dto.response.UserResponse;
import com.pm.backendspringboot.application.user.UserService;
import com.pm.backendspringboot.domain.user.UserEntity;
import com.pm.backendspringboot.repository.UserRepository;
import com.pm.backendspringboot.utils.UserACL;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserACL userACL;


    @Override
    public UserEntity createUserRequest(CreateUserRequest request) {
        if (userRepository.existsByAuth0Id(request.auth0Id())) {
            throw new RuntimeException("User already exists with auth0Id: " + request.auth0Id());
        }

        UserEntity user = new UserEntity();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setAuth0Id(request.auth0Id());
        return userRepository.save(user);
    }

    @Override
    public UserResponse createUser1(CreateUserRequest request) {
        if (userRepository.existsByAuth0Id(request.auth0Id())) {
            throw new RuntimeException("User already exists with auth0Id: " + request.auth0Id());
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(request.email());
        userEntity.setAuth0Id(request.auth0Id());
        userEntity.setName(request.name());
        log.info("User created with auth0Id: " + request.auth0Id());
        log.info("User created with email: " + request.email());
        log.info("new user: ", userEntity);
        userRepository.save(userEntity);

        return UserResponse.builder()
                .auth0Id(request.auth0Id())
                .email(request.email())
                .name(request.name())
                .build();
    }

    @Override
    public UserResponse getUserById(String auth0Id) {
        UserEntity userEntity = userRepository.findByAuth0Id(auth0Id).get();
        if (userEntity == null) {
            throw new RuntimeException("User not found with auth0Id: " + auth0Id);
        }

        return UserResponse.builder()
                .auth0Id(userEntity.getAuth0Id())
                .email(userEntity.getEmail())
                .name(userEntity.getName())
                .build();
    }

    @Override
    public UserResponse updateUserProfile(String auth0Id, UpdateUserRequest request) {
        // Fetch the user by auth0Id
        Optional<UserEntity> optionalUserEntity = userRepository.findByAuth0Id(auth0Id);

        // Check if user exists
        if (!optionalUserEntity.isPresent()) {
            throw new RuntimeException("User not found with auth0Id: " + auth0Id);
        }

        // Update user entity with new details
        UserEntity userEntity = optionalUserEntity.get();
        userEntity.setName(request.getName());
        userEntity.setAddressLine1(request.getAddressLine1());
        userEntity.setCountry(request.getCountry());

        // Save the updated user back to the repository
        UserEntity updatedUser = userRepository.save(userEntity);

        // Return a response object
        return UserResponse.builder()
                .auth0Id(updatedUser.getAuth0Id())
                .name(updatedUser.getName())
                .email(updatedUser.getEmail())
                .build();
    }

}
