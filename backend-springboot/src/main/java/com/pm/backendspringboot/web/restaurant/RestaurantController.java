package com.pm.backendspringboot.web.restaurant;

import com.pm.backendspringboot.application.dto.request.restaurant.CreateRestaurantRequest;
import com.pm.backendspringboot.application.dto.request.restaurant.CreateRestaurantResponse;
import com.pm.backendspringboot.application.restaurant.RestaurantService;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.attribute.UserPrincipal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my/restaurant")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<CreateRestaurantResponse> createRestaurantResponse(@RequestBody CreateRestaurantRequest request,
                                                                             @RequestPart("file") MultipartFile file,
                                                                             @AuthenticationPrincipal Jwt jwt) throws IOException {
        String sub = jwt.getSubject();
        return ResponseEntity.ok(restaurantService.createRestaurantResponse(request, file,sub ));
    }
}
