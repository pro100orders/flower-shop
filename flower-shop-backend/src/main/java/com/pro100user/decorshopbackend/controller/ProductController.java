package com.pro100user.decorshopbackend.controller;

import com.pro100user.decorshopbackend.annotation.CurrentUser;
import com.pro100user.decorshopbackend.dto.ProductCreateDTO;
import com.pro100user.decorshopbackend.dto.ProductDTO;
import com.pro100user.decorshopbackend.dto.ProductListDTO;
import com.pro100user.decorshopbackend.dto.ProductUpdateDTO;
import com.pro100user.decorshopbackend.security.UserSecurity;
import com.pro100user.decorshopbackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("products")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductListDTO> products(
            @RequestParam(name = "search", required = false, defaultValue = "") String search,
            @CurrentUser UserSecurity userSecurity
    ) {
        return productService.getAll(userSecurity, search);
    }

    @GetMapping("{id}")
    public ProductDTO details(
            @PathVariable("id") Long id,
            @CurrentUser UserSecurity userSecurity
    ) {
        return productService.getById(id, userSecurity);
    }

    @PostMapping
    public ProductListDTO create(
            @RequestBody ProductCreateDTO dto
    ) {
        return productService.create(dto);
    }

    @PutMapping
    public ProductListDTO update(
            @RequestBody ProductUpdateDTO dto
    ) {
        return productService.update(dto);
    }

    @DeleteMapping("{id}")
    public boolean delete(
            @PathVariable("id") Long id
    ) {
        return productService.delete(id);
    }


    @PostMapping("image/{id}")
    public ProductListDTO setImage(
            @RequestParam("image") MultipartFile file,
            @PathVariable("id") Long productId
    ) {
        return productService.setImage(file, productId);
    }

    @PutMapping("image/{id}")
    public boolean updateImage(
            @RequestParam("image") MultipartFile file,
            @PathVariable("id") Long productId
    ) {
        return productService.updateImage(file, productId);
    }

    @DeleteMapping("image/{id}")
    public boolean deleteImage(
            @PathVariable("id") Long productId
    ) {
        return productService.deleteImage(productId);
    }

    @GetMapping("count")
    public Map<String, Long> getCount() {
        return Map.of("count", productService.getCount());
    }
}
