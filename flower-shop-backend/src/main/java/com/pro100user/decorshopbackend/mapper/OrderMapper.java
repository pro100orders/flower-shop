package com.pro100user.decorshopbackend.mapper;

import com.pro100user.decorshopbackend.dto.OrderDTO;
import com.pro100user.decorshopbackend.dto.OrderUpdateDTO;
import com.pro100user.decorshopbackend.entity.Order;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {UserMapper.class, ProductMapper.class})
public interface OrderMapper {

    Order toEntity(OrderUpdateDTO dto);

    OrderDTO toOrderDTO(Order order);
    List<OrderDTO> toOrderDTO(List<Order> order);
}
