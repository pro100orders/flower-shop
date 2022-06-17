package com.pro100user.decorshopbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class ProductCreateDTO {

    private String name;

    private double price;

    private int amount;

    private String description;

    private String additionally;
}
