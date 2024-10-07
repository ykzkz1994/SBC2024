package com.sbcamping.admin.notice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data //Getter,Setter,equals,hashCode,toString자동 생성
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDTO {

    private Long noticeId;  //공지글 번호
    private String noticeTitle; //공지글 제목
    private String noticeContent;   //공지글 내용
    private LocalDateTime noticeDate;    //공지글 작성일자
    private Long noticeView;    //공지글 조회수
}
