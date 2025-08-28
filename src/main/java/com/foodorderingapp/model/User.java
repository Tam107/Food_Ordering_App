package com.foodorderingapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String auth0Id;

    private String email;

    private String name;

    private String password;

    private String addressLine1;

    private String city;

    private String country;

    @OneToOne
    private Restaurants restaurants;


}
