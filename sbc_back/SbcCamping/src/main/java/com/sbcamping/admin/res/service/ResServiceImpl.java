/*
package com.sbcamping.admin.res.service;

import com.sbcamping.admin.res.dto.ResDTO;
import com.sbcamping.domain.Reservation;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@Log4j2
public class ResServiceImpl implements ResService {

    @Override // 재정의
    public Reservation readRes(String RES_ID) { // 예약 조회 메서드
        log.info("예약 조회 메서드 시작");

        // ID를 Long 타입으로 변환하고 예약 조회
        Optional<Reservation> result = resRepository.findById(Long.parseLong(RES_ID));
        Reservation res = result.orElse(null);

        // 조회된 예약이 존재하는 경우 조회수 증가 및 저장
        if (res != null) {
            // 조회수 증가 +1
            res.setNBoardViews(res.getNBoardViews() + 1);

            // 증가된 조회수 저장
            resRepository.save(res);
        }

        return res; // 조회된 예약을 반환
    }
}
*/
