package com.pro100user.decorshopbackend.controller;

import com.pro100user.decorshopbackend.annotation.CurrentUser;
import com.pro100user.decorshopbackend.dto.*;
import com.pro100user.decorshopbackend.security.UserSecurity;
import com.pro100user.decorshopbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("user")
@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public UserDTO profile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getById(userSecurity.getId());
    }

    @PutMapping("/profile")
    public UserDTO updateProfile(
            @RequestBody UserUpdateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setId(userSecurity.getId());
        return userService.update(dto);
    }

    @DeleteMapping("/profile")
    public boolean deleteProfile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.delete(userSecurity.getId());
    }

    @GetMapping("/basket")
    public List<ProductListDTO> basket(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getBasket(userSecurity.getId());
    }

    @PostMapping("/basket")
    public ProductListDTO toggleBasket(
            @CurrentUser UserSecurity userSecurity,
            @RequestBody Long productId
    ) {
        return userService.toggleBasket(userSecurity.getId(), productId);
    }

    @GetMapping("/orders")
    public List<OrderDTO> orders(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getOrders(userSecurity.getId());
    }

    @PostMapping("/orders")
    public boolean toOrder(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.toOrder(userSecurity.getId());
    }
}
