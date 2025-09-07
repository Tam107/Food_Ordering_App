package com.pm.backendspringboot.utils;

import com.pm.backendspringboot.domain.user.UserEntity;
import com.pm.backendspringboot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class UserACL {

    private final UserRepository userRepository;

    public boolean checkUserExist(String auth0Id) {
        return userRepository.existsByAuth0Id(auth0Id);
    }

}
