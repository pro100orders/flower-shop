package com.pro100user.decorshopbackend.service.impl;

import com.pro100user.decorshopbackend.dto.ProductCreateDTO;
import com.pro100user.decorshopbackend.dto.ProductDTO;
import com.pro100user.decorshopbackend.dto.ProductListDTO;
import com.pro100user.decorshopbackend.dto.ProductUpdateDTO;
import com.pro100user.decorshopbackend.entity.Product;
import com.pro100user.decorshopbackend.mapper.ProductMapper;
import com.pro100user.decorshopbackend.repository.ProductRepository;
import com.pro100user.decorshopbackend.repository.UserRepository;
import com.pro100user.decorshopbackend.security.UserSecurity;
import com.pro100user.decorshopbackend.service.ImageService;
import com.pro100user.decorshopbackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    private final UserRepository userRepository;

    private final ImageService imageService;


    @Override
    public ProductListDTO create(ProductCreateDTO dto) {
        Product entity = productMapper.toEntity(dto);
        return productMapper.toProductListDTO(
                productRepository.save(entity), null
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getById(Long productId, UserSecurity userSecurity) {
        return productMapper.toProductDTO(
                productRepository.findById(productId).orElseThrow(),
                userSecurity == null ?
                        null
                        :
                        userRepository.findById(userSecurity.getId()).orElseThrow().getWishList()
        );
    }

    @Override
    public ProductListDTO update(ProductUpdateDTO dto) {
        Product entity = productMapper.toEntity(dto);
        return productMapper.toProductListDTO(
                productRepository.save(entity), null
        );
    }

    @Override
    public boolean delete(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        if(!product.getBaskets().isEmpty() || !product.getOrders().isEmpty()) {
            throw new IllegalArgumentException("Видалення не доступне, так як цей товар використовується!");
        }
        productRepository.deleteById(productId);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductListDTO> getAll(UserSecurity userSecurity, String search) {
        return productMapper.toProductListDTO(
                productRepository.findAll().stream()
                        .filter(product -> product.getName().contains(search)).toList(),
                userSecurity == null ?
                        null
                        :
                        userRepository.findById(userSecurity.getId()).orElseThrow().getWishList()
        );
    }

    @Override
    public ProductListDTO setImage(MultipartFile file, Long productId) {
        Product entity = productRepository.findById(productId).orElseThrow();
        entity.setImage(imageService.save(file, productId));
        return productMapper.toProductListDTO(
                productRepository.save(entity), null
        );
    }

    @Override
    public boolean updateImage(MultipartFile file, Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        return imageService.update(product.getImage(), file);
    }

    @Override
    public boolean deleteImage(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        return imageService.delete(product.getImage());
    }


    @Override
    @Transactional(readOnly = true)
    public long getCount() {
        return productRepository.getCount();
    }
}
