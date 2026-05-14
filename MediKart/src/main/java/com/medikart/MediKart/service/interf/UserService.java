package com.medikart.MediKart.service.interf;

import com.medikart.MediKart.dto.LoginRequest;
import com.medikart.MediKart.dto.Response;
import com.medikart.MediKart.dto.UserDto;
import com.medikart.MediKart.entity.User;
public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
}
