package com.sbcamping.admin.notice.service;

import com.sbcamping.domain.NoticeBoard;

public interface NoticeService {

    public NoticeBoard readNotice(String nboard_Id);   // 공지 조회
    public void updateNotice(String nboard_Id); // 공지 수정
    public void deleteNotice(String nboard_Id); // 공지 삭제
    public void createNotice(String nboard_Id);      // 공지 등록
}
