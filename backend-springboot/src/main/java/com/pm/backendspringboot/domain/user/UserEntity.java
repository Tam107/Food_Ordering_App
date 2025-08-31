package com.pm.backendspringboot.domain.user;


import com.pm.backendspringboot.domain.restaurant.Restaurant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String auth0Id;

    private String email;

    private String name;

    private String password;

    private String addressLine1;

    private String city;

    private String country;

    @OneToOne
    private Restaurant restaurant;


}
