package com.sbcamping.admin.notice.service;

import com.sbcamping.admin.notice.repository.NoticeRepository;
import com.sbcamping.domain.NoticeBoard;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@Log4j2
public class NoticeServiceImpl implements NoticeService{

    // NoticeRepository 필드 선언
    private final NoticeRepository noticeRepository;

    // 생성자를 통해 NoticeRepository 주입
    @Autowired
    public NoticeServiceImpl(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @Override   //service에서 선언한거 재정의
    public void updateNotice(String nboard_Id){//공지 수정 메서드
        log.info("공지 수정 메서드 시작");
        Optional<NoticeBoard> result = noticeRepository.findById(Long.valueOf(nboard_Id));
        //값이 null일경우 예외처리
        NoticeBoard notice = result.orElseThrow(() -> new NoSuchElementException("해당 공지 번호가 존재하지 않습니다"));

        //뷰단에서 기존 제목과 타이틀이 기본입력

        String newTitle = "새 제목";
        String newContent = "새 내용";

        notice.changeNBoardTitle(newTitle);
        notice.changeNBoardContent(newContent);

        noticeRepository.save(notice);
        log.info("공지 수정 메서드 끝");

    }

    @Override //재정의
    public NoticeBoard readNotice(String nboard_Id) { // 공지 조회 메서드
        log.info("공지 조회 메서드 시작");

        // ID를 Long 타입으로 변환하고 공지 조회

        //findByID로 공지글번호로 noticeRepsotiry에서 정보를 result에 할당

        //문자열로 전달된 nboard_id를 Long타입으로 변환 이는 findById(=Dto에서 선언한 변수의 타입)의 타입이 Long타입이기 때문
        //noticeRepository를 통해 데이터베이스에서 해당 ID에 해당하는 공지글을 조회합니다.
        // findById 메서드는 조회 결과가 없을 수 있기 때문에, 결과를 Optional로 반환합니다.
        //공지글 번호로 noticeRepository에서 정보를 조회하여 result에 할당
        Optional<NoticeBoard> result = noticeRepository.findById(Long.parseLong(nboard_Id));
        NoticeBoard notice = result.orElse(null);

        // 조회된 공지가 존재하는 경우 조회수 증가 및 저장
        if (notice != null) {
            // 조회수 증가 +1
            notice.setNBoardViews(notice.getNBoardViews() + 1);

            // 증가된 조회수 저장
            noticeRepository.save(notice);
        }

        log.info("공지 조회 메서드 끝");

        // 조회된 결과값을 반환
        return notice;
    }


    @Override
    public void deleteNotice(String nboard_Id) { // 공지 삭제 메서드
        log.info("공지 삭제 메서드 시작");

        // nboard_Id를 Long 타입으로 변환
        Long noticeId = Long.valueOf(nboard_Id);

        // 공지를 삭제
        noticeRepository.deleteById(noticeId);

        log.info("공지 삭제 메서드 끝");
    }


    @Override
    public void createNotice(String nboard_Id) {
        log.info("공지 등록 메서드 시작");
        String newNoticeTitle = "입력받아서 할당하게 ";
        String newNoticeContents = "입력받아서 할당하게 ";


        // Reservation 객체 생성
        NoticeBoard noticeBoard = NoticeBoard.builder()
                .nBoardTitle(newNoticeTitle)
                .nBoardContent(newNoticeContents)
                .nBoardDate(new Date())//현재시간 할당 sysdate랑 비슷한가?
                .nBoardViews(0L)//조회메서드가 실행 될 때마다 View가 1씩 증가하게 해놓으면 될 듯?
                .build();

        noticeRepository.save(noticeBoard);
        log.info("공지 등록 메서드 끝");
    };




}
