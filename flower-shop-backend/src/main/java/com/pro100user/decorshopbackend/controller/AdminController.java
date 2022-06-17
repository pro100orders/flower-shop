package com.pro100user.decorshopbackend.controller;

import com.pro100user.decorshopbackend.dto.OrderDTO;
import com.pro100user.decorshopbackend.dto.OrderUpdateDTO;
import com.pro100user.decorshopbackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("admin")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AdminController {

    public final OrderService orderService;

    @GetMapping("/orders")
    public List<OrderDTO> orders() {
        return orderService.getAll().stream()
                .sorted(Comparator.comparing(OrderDTO::getCreatedAt).reversed())
                .toList();
    }

    @PutMapping("/orders")
    public OrderDTO orders(
            @Valid @RequestBody OrderUpdateDTO dto
    ) {
        return orderService.update(dto);
    }

    @DeleteMapping("/orders/{id}")
    public boolean deleteOrder(
            @PathVariable("id") Long id
    ) {
        return orderService.delete(id);
    }
}
