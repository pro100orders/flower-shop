package com.pro100user.decorshopbackend.mapper;

import com.pro100user.decorshopbackend.dto.UserCreateDTO;
import com.pro100user.decorshopbackend.dto.UserDTO;
import com.pro100user.decorshopbackend.dto.UserUpdateDTO;
import com.pro100user.decorshopbackend.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    User toEntity(UserCreateDTO dto);
    User toEntity(UserUpdateDTO dto);

    UserDTO toUserDTO(User user);
    List<UserDTO> toUserDTO(List<User> users);
}
