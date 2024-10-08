package com.sbcamping.admin.notice.service;

import com.sbcamping.admin.notice.dto.NoticeDTO;

public interface NoticeService {

    public void createNotice(String title,String content);      // 공지 등록
    public NoticeDTO readNotice(Long noticeId);   // 공지 조회
    public void updateNotice(Long noticeId, String title, String content); // 공지 수정
    public void deleteNotice(Long noticeId); // 공지 삭제
    public void increaseViews(Long noticeId);
    //조회수 증가 = 메서드 선언후 다른 메서드에서 활용 할 것
}
