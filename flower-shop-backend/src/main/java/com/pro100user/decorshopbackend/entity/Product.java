package com.pro100user.decorshopbackend.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "products")
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "name", nullable = false)//назва
    protected String name;

    @Column(name = "image")
    protected String image;

    @Column(name = "price", nullable = false)//ціна
    protected double price;

    @Column(name = "amount", nullable = false)//кількість
    protected int amount;

    @Column(name = "description")//Опис
    protected String description;

    @Column(name = "additionally")//Додатково
    protected String additionally;


    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY, targetEntity = Basket.class)
    private List<Basket> baskets = new ArrayList<>();

    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY, targetEntity = Order.class)
    private List<Order> orders = new ArrayList<>();

    @ManyToMany(mappedBy = "wishList", fetch = FetchType.LAZY, targetEntity = User.class)
    private List<User> users = new ArrayList<>();
}
