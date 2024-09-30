package com.sbcamping.admin.res.service;

import com.sbcamping.admin.res.dto.ResDTO;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Log4j2
public class ResServiceImpl implements ResService{

    @Override
    public Long readRes(ResDTO resDTO){
        //예약 조회코드 넣기 
        //스위치로 밸류값 분별해서 넣을지 메서드를 3개 만들지 고민
        log.info("예약 조회 메서드 ");
        return null;
    }

}
