package com.sbcamping.admin.camper.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CamperDTO {
    private Long cBoardID;   // 글 번호
    private String cBoardCategory;   // 글 머리
    private String cBoardTitle;     // 글 제목
    private String cBoardContent;   // 글 내용
    private Long cBoardViews;       // 글 조회수
    private Long memberId;  // 작성자(ID)
    private Date cBoardDate;        // 작성일
    private Long commCount;     // 댓글 수
}
