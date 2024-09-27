package com.sbcamping.admin.notice;

import com.sbcamping.admin.notice.repository.NoticeRepository;
import com.sbcamping.admin.res.repository.ResRepository;
import com.sbcamping.admin.site.repository.SiteRepository; // SiteRepository 추가
import com.sbcamping.domain.NoticeBoard;
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Site;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@SpringBootTest
@Slf4j
public class NoticeRepositoryTests{

    // SimpleDateFormat을 사용해 Date 생성
    Date nBoardDate = new SimpleDateFormat("yyyy-MM-dd").parse("2024-09-27");

    @Autowired
    private NoticeRepository noticeRepository;


    public NoticeRepositoryTests() throws ParseException {
    }

    //fk가 없어서 의존성이 필요 없음



    @Test
    @DisplayName("Res 테이블 값 제대로 전달 되는지 테스트")
    public void testCreateNotice() {


        // Reservation 객체 생성
        NoticeBoard noticeBoard = NoticeBoard.builder()
                .nBoardID(123456L)
                .nBoardTitle("제목")
                .nBoardContent("진짜 Optional부숴버리고싶어")
                .nBoardDate(nBoardDate)
                .nBoardViews(10L)
                .build();

        // 생성한 객체를 DB에 저장
        log.info("------------------------------------------------------------------------------");
        noticeRepository.save(noticeBoard); // 객체를 저장
        log.info("noticeBoard saved: " + noticeBoard);
        log.info("------------------------------------------------------------------------------");


        log.info("------------------------------------------------------------------------------");
        log.info(noticeRepository.findAll().toString());
        log.info("------------------------------------------------------------------------------");
    }

    @Test
    @DisplayName("Notice 수정 테스트 ")
    public void testUpdateNotice() {
        //여기에 넣어 코드
    }

    @Test
    @DisplayName("Notice 삭제 테스트 ")
    public void testDeleteNotice() {
        //여기에 넣어 코드
    }
}
