package com.sbcamping.admin.notice.service;

import com.sbcamping.admin.notice.dto.NoticeDTO;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Log4j2
public class NoticeServiceImpl implements NoticeService{

    @Override
    public Long readNotice(NoticeDTO noticeDTO){ //공지 조회
        log.info("공지 조회 메서드");
        return null;
    };

    @Override
    public Long updateNotice(NoticeDTO noticeDTO){//공지 수정
        log.info("공지 수정 메서드 ");
        return null;
    };

    @Override
    public Long deleteNotice(NoticeDTO noticeDTO){//공지 삭제
        log.info("공지 삭제 메서드 ");
        return null;
    };
    
    @Override
    public Long createNotice(NoticeDTO noticeDTO){//공지 생성
        log.info("공지 생성 메서드 ");
        return null;
    };  



}
