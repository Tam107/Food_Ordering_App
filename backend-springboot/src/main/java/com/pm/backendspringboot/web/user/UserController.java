package com.pm.backendspringboot.web.user;

import com.pm.backendspringboot.application.dto.request.user.CreateUserRequest;
import com.pm.backendspringboot.application.dto.request.user.UpdateUserRequest;
import com.pm.backendspringboot.application.dto.response.UserResponse;
import com.pm.backendspringboot.application.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@Slf4j(topic = "USER-CONTROLLER")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
//@CrossOrigin("http://localhost:5173")
public class UserController {

    private final UserService userService;


    @PostMapping("/my/user")
    public ResponseEntity<UserResponse> createUser(@RequestBody @Valid CreateUserRequest createUserRequest,
                                                   @AuthenticationPrincipal Jwt jwt) {
        String jwtAuth0Id = jwt.getSubject();
        if (!jwtAuth0Id.equals(createUserRequest.auth0Id())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(userService.createUser1(createUserRequest));
    }

    @GetMapping("/my/user")
    public ResponseEntity<UserResponse> getUser(@AuthenticationPrincipal Jwt jwt) {
        String sub = jwt.getSubject();
        return ResponseEntity.ok(userService.getUserById(sub));
    }

    @PutMapping("/my/user")
    public ResponseEntity<UserResponse> updateUser(@AuthenticationPrincipal Jwt jwt, @RequestBody UpdateUserRequest request) {
        String sub = jwt.getSubject();
        return ResponseEntity.ok(userService.updateUserProfile(sub, request));
    }

}
