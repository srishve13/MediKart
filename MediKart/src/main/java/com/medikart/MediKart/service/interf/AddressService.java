package com.medikart.MediKart.service.interf;

import com.medikart.MediKart.dto.AddressDto;
import com.medikart.MediKart.dto.Response;
public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);

}
