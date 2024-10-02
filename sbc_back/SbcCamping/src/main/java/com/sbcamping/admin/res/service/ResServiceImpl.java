package com.sbcamping.admin.res.service;

import com.sbcamping.admin.res.dto.ResDTO;
import com.sbcamping.domain.Reservation;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@Log4j2
public class ResServiceImpl implements ResService{

    @Override //재정의
    public Reservation readRes(String RES_ID) { // 공지 조회 메서드
        log.info("예약 조회 메서드 시작");

        // ID를 Long 타입으로 변환하고 공지 조회
        //findByID로 공지글번호로 noticeRepsotiry에서 정보를 result에 할당
        //문자열로 전달된 nboard_id를 Long타입으로 변환 이는 findById(=Dto에서 선언한 변수의 타입)의 타입이 Long타입이기 때문
        //noticeRepository를 통해 데이터베이스에서 해당 ID에 해당하는 공지글을 조회합니다.
        // findById 메서드는 조회 결과가 없을 수 있기 때문에, 결과를 Optional로 반환합니다.
        //공지글 번호로 noticeRepository에서 정보를 조회하여 result에 할당
        Optional<Reservation> result = resRepository.findById(Long.parseLong(RES_ID));
        Reservation res = result.orElse(null);

        // 조회된 공지가 존재하는 경우 조회수 증가 및 저장
        boolean notice;
        if (notice != null) {
            // 조회수 증가 +1
            notice.setNBoardViews(notice.getNBoardViews() + 1);

            // 증가된 조회수 저장
            noticeRepository.save(notice);
        }

}
