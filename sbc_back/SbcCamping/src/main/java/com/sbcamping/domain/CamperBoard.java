package com.sbcamping.domain;

import jakarta.persistence.*;
import lombok.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "Camper_Board")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CamperBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//프라이머리키 자동설정 od
    @Column(name = "Cboard_ID", columnDefinition = "NUMBER(10,0)")
    private Long cBoardID; //캠퍼 게시판 글 번호

    // Member테이블을 참조하는 회원 번호(FK) ,이 경우엔 필드명이 같지만 테이블마다 컬럼명이 다를 수도 있으니 지정해줘야함
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", referencedColumnName = "MEMBER_ID")
    private Member member; // 외래키가 참조하는 테이블

    @Column(name = "Cboard_Category", nullable = false, length = 10)
    private String cBoardCategory; //캠퍼 게시글 말머리

    @Column(name = "Cboard_Title", nullable = false, length = 50)
    private String cBoardTitle;    //캠퍼 게시판 글 제목

    @Column(name = "Cboard_Content", nullable = false, length = 1000)
    private String cBoardContent;  //캠퍼 게시판 글 내용

    @Column(name = "Cboard_Views", nullable = false, columnDefinition = "NUMBER(30,0)")
    private Long cBoardViews;      //게시글 조회수

    @Column(name = "Cboard_Date", nullable = false)
    private String cBoardDate;       //캠퍼게시판 게시글 작성일자

    @Column(name = "Cboard_Attachment", nullable = true, length = 200)
    private String cBoardAttachment;    //파일 첨부여부(url,링크)

    @PrePersist
    protected void onCreate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        cBoardDate = sdf.format(new Date());  // 현재 날짜를 패턴에 맞춰 저장한다
    }
}
