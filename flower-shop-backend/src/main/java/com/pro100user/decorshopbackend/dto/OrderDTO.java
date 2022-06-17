package com.pro100user.decorshopbackend.dto;

import com.pro100user.decorshopbackend.entity.enums.Status;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class OrderDTO {

    private Long id;

    private UserDTO user;

    private List<ProductListDTO> products;

    private Status status;

    private double totalPrice;


    private LocalDateTime createdAt;
}
