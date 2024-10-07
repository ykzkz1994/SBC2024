package com.sbcamping.admin.notice.repository;

import com.sbcamping.domain.NoticeBoard;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
                .nBoardId(123456L)
                .nBoardTitle("제목")
                .nBoardContent("진짜 Optional부숴버리고싶어")
                .nBoardDate(nBoardDate)
                .nBoardViews(10L)
                .build();

        // 생성한 객체를 DB에 저장
        log.info("------------------------------------------------------------------------------");
        noticeRepository.save(noticeBoard); // 객체를 저장
        log.info("저장된 공지: " + noticeBoard);
        log.info("------------------------------------------------------------------------------");


        log.info("------------------------------------------------------------------------------");
        log.info(noticeRepository.findAll().toString());
        log.info("------------------------------------------------------------------------------");
    }

    @Test //테스트
    @DisplayName("공지 수정 테스트") //테스트 이름 할당
    @Commit //커밋
    //Notice 객체 생성
    public void testUpdateNotice() {

        Optional<NoticeBoard> result = noticeRepository.findById(1L);
        NoticeBoard notice = result.orElseThrow();

        notice.changeNBoardTitle("긴급 공지 테스트1번");
        notice.changeNBoardContent("현시간부로 예약금지 ");

        noticeRepository.save(notice);


    }

    @Test   //테스트 메서드
    @DisplayName("Notice 삭제 테스트 ") //테스트이름
    @Commit //변경사항 저장
    public void testDeleteNotice() {
        Long noticeId = 1L; //근데 롱타입변수인데 L을 붙여야함?

        noticeRepository.deleteById(noticeId);

    }
}
