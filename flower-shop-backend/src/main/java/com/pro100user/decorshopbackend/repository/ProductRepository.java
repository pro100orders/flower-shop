package com.pro100user.decorshopbackend.repository;

import com.pro100user.decorshopbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT COUNT(*) FROM products", nativeQuery = true)
    long getCount();
}
