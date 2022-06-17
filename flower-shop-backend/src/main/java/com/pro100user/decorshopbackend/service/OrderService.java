package com.pro100user.decorshopbackend.service;

import com.pro100user.decorshopbackend.dto.OrderDTO;
import com.pro100user.decorshopbackend.dto.OrderUpdateDTO;

import java.util.List;

public interface OrderService {

    OrderDTO getById(Long orderId);
    OrderDTO update(OrderUpdateDTO dto);
    boolean delete(Long orderId);
    List<OrderDTO> getAll();
}
