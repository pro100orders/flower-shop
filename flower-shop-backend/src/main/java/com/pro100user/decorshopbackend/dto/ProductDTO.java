package com.pro100user.decorshopbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class ProductDTO {

    private Long id;

    private String name;

    private String image;

    private double price;

    private int amount;

    private String description;

    private String additionally;

    private boolean isLike;
}
