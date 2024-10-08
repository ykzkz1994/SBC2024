package com.sbcamping.admin.camper.dto;

import com.sbcamping.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    private Member member;  // member entity : 작성자(ID)
    private Date cBoardDate;        // 작성일
    private Long commCount;     // 댓글 수

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<MultipartFile>(); // 새롭게 서버에 보내지는 실제 파일 데이터

    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<String>(); // 업로드가 완료된 파일의 이름만 문자열로 보관한 리스트
}
