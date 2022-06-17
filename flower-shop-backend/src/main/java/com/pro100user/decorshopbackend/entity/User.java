package com.pro100user.decorshopbackend.entity;

import com.pro100user.decorshopbackend.entity.enums.Role;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "address")
    private String address;

    @ElementCollection(fetch = FetchType.EAGER, targetClass = Role.class)
    @CollectionTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private List<Role> roles = new ArrayList<>();

    @Column(name = "enabled", nullable = false)
    private boolean enabled;


    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Basket.class)
    private Basket basket;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, targetEntity = Order.class)
    private List<Order> orders = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Product.class)
    @JoinTable(
            name = "wish_list",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id")
    )
    private List<Product> wishList = new ArrayList<>();
}
