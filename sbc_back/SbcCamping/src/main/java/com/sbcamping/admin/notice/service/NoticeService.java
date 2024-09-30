package com.sbcamping.admin.notice.service;


import com.sbcamping.admin.notice.dto.NoticeDTO;

public interface NoticeService {

    Long readNotice(NoticeDTO noticeDTO);   //공지 조회
    Long updateNotice(NoticeDTO noticeDTO); //공지 수정
    Long deleteNotice(NoticeDTO noticeDTO); //공지 삭제
    Long createNotice(NoticeDTO noticeDTO); // 공지 등록


}
