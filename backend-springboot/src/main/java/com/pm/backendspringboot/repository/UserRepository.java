package com.pm.backendspringboot.repository;

import com.pm.backendspringboot.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByAuth0Id(String auth0Id);
    boolean existsByAuth0Id(String auth0Id);
}
