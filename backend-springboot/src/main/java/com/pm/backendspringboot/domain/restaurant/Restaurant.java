package com.pm.backendspringboot.domain.restaurant;


import com.pm.backendspringboot.domain.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "restaurant")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String city;
    private String country;

    @Column(name = "delivery_price")
    private Double deliveryPrice;

    @Column(name = "estimated_delivery_time")
    private Double estimatedDeliveryTime;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToOne
    private UserEntity user;

    @OneToMany(mappedBy = "restaurant")
    private List<Cuisine> cuisines;

    @OneToMany(mappedBy = "restaurant")
    private List<MenuItem> menuItems;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}

