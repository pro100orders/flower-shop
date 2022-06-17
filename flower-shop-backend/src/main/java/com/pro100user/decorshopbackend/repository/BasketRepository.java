package com.pro100user.decorshopbackend.repository;

import com.pro100user.decorshopbackend.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
}
