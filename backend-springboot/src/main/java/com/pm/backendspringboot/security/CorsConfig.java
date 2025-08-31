//package com.pm.backendspringboot.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.util.List;
//
//@Configuration
//public class CorsConfig {
//
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:5173") // Allows requests from this origin
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTION") // Allows specified HTTP methods
//                        .allowedHeaders("*") // Allows all headers
//                        .allowCredentials(true); // Allows credentials (e.g., cookies)
//            }
//        };
//    }
//}
