package com.foodorderingapp.security.jwt;

import com.foodorderingapp.domain.UserEntity;
import com.foodorderingapp.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication instanceof JwtAuthenticationToken jwtAuth)){
            filterChain.doFilter(request, response);
            return;
        }

        Jwt jwt = jwtAuth.getToken();
        String auth0Id = jwt.getSubject();

        if (auth0Id == null || auth0Id.isBlank()){
            unauthorized(response, "Unauthorized - no subject in token");
            return;
        }

        Optional<UserEntity> userEntity = userRepository.findByAuth0Id(auth0Id);
        if (userEntity.isEmpty()){
            unauthorized(response, "Unauthorized - user not found");
        }

        UserEntity user = userEntity.get();

        // Gắn attribute để downstream sử dụng tương tự Node middleware
        request.setAttribute("auth0Id", auth0Id);
        request.setAttribute("userId", String.valueOf(user.getId()));

        filterChain.doFilter(request, response);

    }

    private void unauthorized(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        String body = "{\"message\":\"" + message + "\"}";
        response.getOutputStream().write(body.getBytes(StandardCharsets.UTF_8));
    }

}
