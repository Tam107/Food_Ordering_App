package com.foodorderingapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Restaurants {

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
    private User user;

    @OneToMany(mappedBy = "restaurants")
    private List<Cuisine> cuisines;

    @OneToMany(mappedBy = "restaurants")
    private List<MenuItem> menuItems;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}
