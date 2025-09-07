package com.pm.backendspringboot.application.dto.request.user;

public record CreateUserRequest(String auth0Id, String email, String name) {
}
