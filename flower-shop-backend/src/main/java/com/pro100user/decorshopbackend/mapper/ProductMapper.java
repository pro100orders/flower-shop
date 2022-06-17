package com.pro100user.decorshopbackend.mapper;

import com.pro100user.decorshopbackend.dto.ProductCreateDTO;
import com.pro100user.decorshopbackend.dto.ProductDTO;
import com.pro100user.decorshopbackend.dto.ProductListDTO;
import com.pro100user.decorshopbackend.dto.ProductUpdateDTO;
import com.pro100user.decorshopbackend.entity.Product;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper
public interface ProductMapper {

    Product toEntity(ProductCreateDTO dto);
    Product toEntity(ProductUpdateDTO dto);

    @Named("productIsLike")
    default boolean productIsLike(Product product, @Context List<Product> wishList) {
        if(wishList == null || wishList.isEmpty())
            return false;
        return wishList.contains(product);
    }

    @Mapping(source = "product", target = "isLike", qualifiedByName = "productIsLike")
    ProductDTO toProductDTO(Product product, @Context List<Product> wishList);
    @Mapping(source = "product", target = "isLike", qualifiedByName = "productIsLike")
    ProductListDTO toProductListDTO(Product product, @Context List<Product> wishList);
    @Mapping(source = "product", target = "isLike", qualifiedByName = "productIsLike")
    List<ProductListDTO> toProductListDTO(List<Product> products, @Context List<Product> wishList);
}
