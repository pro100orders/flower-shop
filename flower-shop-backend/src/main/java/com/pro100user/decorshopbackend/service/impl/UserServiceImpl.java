package com.pro100user.decorshopbackend.service.impl;

import com.pro100user.decorshopbackend.dto.*;
import com.pro100user.decorshopbackend.entity.Basket;
import com.pro100user.decorshopbackend.entity.Order;
import com.pro100user.decorshopbackend.entity.Product;
import com.pro100user.decorshopbackend.entity.User;
import com.pro100user.decorshopbackend.entity.enums.Role;
import com.pro100user.decorshopbackend.entity.enums.Status;
import com.pro100user.decorshopbackend.mapper.OrderMapper;
import com.pro100user.decorshopbackend.mapper.ProductMapper;
import com.pro100user.decorshopbackend.mapper.UserMapper;
import com.pro100user.decorshopbackend.repository.BasketRepository;
import com.pro100user.decorshopbackend.repository.OrderRepository;
import com.pro100user.decorshopbackend.repository.ProductRepository;
import com.pro100user.decorshopbackend.repository.UserRepository;
import com.pro100user.decorshopbackend.service.ProductService;
import com.pro100user.decorshopbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    private final ProductRepository productRepository;
    private final ProductService productService;
    private final ProductMapper productMapper;

    private final BasketRepository basketRepository;

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean create(UserCreateDTO dto) {
        if (findByEmail(dto.getEmail()) != null) {
            throw new IllegalArgumentException("Ця пошта вже зайнята");
        }
        User entity = userMapper.toEntity(dto);
        entity.setRoles(List.of(Role.ROLE_USER));
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setEnabled(true);
        userRepository.save(entity);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getById(Long userId) {
        return userMapper.toUserDTO(
                userRepository.findById(userId).orElseThrow()
        );
    }

    @Override
    public UserDTO update(UserUpdateDTO dto) {
        User userDTO = userMapper.toEntity(dto);
        User entity = userRepository.findById(userDTO.getId()).orElseThrow();

        if (!entity.getEmail().equals(userDTO.getEmail()) && findByEmail(dto.getEmail()) != null) {
            throw new IllegalArgumentException("Ця пошта вже зайнята");
        }
        if (entity.getPhone() != null && !entity.getPhone().equals(userDTO.getPhone()) && findByPhone(dto.getPhone()) != null) {
            throw new IllegalArgumentException("Цей номер вже зайнятий");
        }
        if (dto.getNewPassword() != null) {
            if (passwordEncoder.matches(entity.getPassword(), userDTO.getPassword())) {
                entity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            }
        }
        entity = entity.toBuilder()
                .surname(userDTO.getSurname() == null ? entity.getSurname() : userDTO.getSurname())
                .name(userDTO.getName() == null ? entity.getName() : userDTO.getName())
                .email(userDTO.getEmail() == null ? entity.getEmail() : userDTO.getEmail())
                .phone(userDTO.getPhone() == null ? entity.getPhone() : userDTO.getPhone())
                .address(userDTO.getAddress() == null ? entity.getAddress() : userDTO.getAddress())
                .build();
        return userMapper.toUserDTO(
                userRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long userId) {
        User entity = userRepository.findById(userId).orElseThrow();
        entity.setEnabled(false);
        userRepository.save(entity);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getAll() {
        return userMapper.toUserDTO(
                userRepository.findAll()
        );
    }


    @Override
    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByPhone(String phone) {
        return userRepository.findByPhone(phone).orElse(null);
    }


    @Override
    @Transactional(readOnly = true)
    public List<ProductListDTO> getWishList(Long userId) {
        List<Product> products = userRepository.findById(userId).orElseThrow().getWishList();
        return productMapper.toProductListDTO(
                products, products
        );
    }

    @Override
    public ProductListDTO toggleWishList(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
        if (user.getWishList().contains(product)) {
            user.getWishList().remove(product);
        } else {
            user.getWishList().add(product);
        }
        userRepository.save(user);
        return productMapper.toProductListDTO(product, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductListDTO> getBasket(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return productMapper.toProductListDTO(
                user.getBasket() == null ? new ArrayList<>() : user.getBasket().getProducts(),
                user.getWishList()
        );
    }

    @Override
    public ProductListDTO toggleBasket(Long userId, Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        if (user.getBasket() == null) {
            Basket basket = new Basket();
            basket.setUser(user);
            basket.setProducts(List.of(product));
            basket.setTotalPrice(product.getPrice());
            basketRepository.save(basket);
        } else {
            Basket basket = user.getBasket();
            if (basket.getProducts().contains(product)) {
                basket.getProducts().remove(product);
                basket.setTotalPrice(basket.getTotalPrice() - product.getPrice());
            } else {
                basket.getProducts().add(product);
                basket.setTotalPrice(basket.getTotalPrice() + product.getPrice());
            }
            basketRepository.save(basket);
        }
        return productMapper.toProductListDTO(
                product,
                user.getWishList()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrders(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return orderMapper.toOrderDTO(
                user.getOrders()
        );
    }

    @Override
    public boolean toOrder(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        if (user.getBasket() == null || user.getBasket().getProducts().isEmpty()) {
            return false;
        }
        Order order = Order.builder()
                .user(user)
                .products(user.getBasket().getProducts())
                .totalPrice(user.getBasket().getTotalPrice())
                .status(Status.Оформлено)
                .build();
        order.getProducts().forEach(product -> product.setAmount(product.getAmount() - 1));
        orderRepository.save(order);
        user.getBasket().setProducts(new ArrayList<>());
        user.getBasket().setTotalPrice(0);
        basketRepository.save(user.getBasket());
        return true;
    }
}
