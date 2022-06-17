package com.pro100user.decorshopbackend.service;

import com.pro100user.decorshopbackend.dto.*;
import com.pro100user.decorshopbackend.entity.User;

import java.util.List;

public interface UserService {

    boolean create(UserCreateDTO dto);
    UserDTO getById(Long userId);
    UserDTO update(UserUpdateDTO dto);
    boolean delete(Long userId);
    List<UserDTO> getAll();

    User findByEmail(String email);
    User findByPhone(String phone);

    List<ProductListDTO> getWishList(Long userId);
    ProductListDTO toggleWishList(Long userId, Long productId);

    List<ProductListDTO> getBasket(Long userId);
    ProductListDTO toggleBasket(Long userId, Long productId);

    List<OrderDTO> getOrders(Long userId);
    boolean toOrder(Long userId);
}
