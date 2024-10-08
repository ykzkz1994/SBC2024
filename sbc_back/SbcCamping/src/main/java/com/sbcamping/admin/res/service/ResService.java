package com.sbcamping.admin.res.service;

import com.sbcamping.admin.res.dto.ResDTO;
import com.sbcamping.domain.Reservation;

public interface ResService {

    public Reservation readRes(String RES_ID);   // 예약 조회
}
