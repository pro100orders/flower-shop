package com.pro100user.decorshopbackend.service;

import com.pro100user.decorshopbackend.dto.ProductCreateDTO;
import com.pro100user.decorshopbackend.dto.ProductDTO;
import com.pro100user.decorshopbackend.dto.ProductListDTO;
import com.pro100user.decorshopbackend.dto.ProductUpdateDTO;
import com.pro100user.decorshopbackend.security.UserSecurity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    ProductListDTO create(ProductCreateDTO dto);
    ProductDTO getById(Long productId, UserSecurity userSecurity);
    ProductListDTO update(ProductUpdateDTO dto);
    boolean delete(Long productId);
    List<ProductListDTO> getAll(UserSecurity userSecurity, String search);

    ProductListDTO setImage(MultipartFile file, Long productId);
    boolean updateImage(MultipartFile file, Long productId);
    boolean deleteImage(Long productId);

    long getCount();
}
