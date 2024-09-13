package com.sbcamping.domain;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
@Table(name="Camper_Board")
public class CamperBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//프라이머리키 자동설정 od
    @Column(name = "Cboard_ID", precision = 10)
    private Long cboardID;          //캠퍼 게시판 글 번호

    @ManyToOne
    // Member테이블을 참조하는 회원 번호(FK) ,이 경우엔 필드명이 같지만 테이블마다 컬럼명이 다를 수도 있으니 지정해줘야함
    @JoinColumn(name = "MEMBER_ID", referencedColumnName = "Member_ID")
    private Member member; // 외래 키가 참조하는 엔티티 클래스

    @Column(name = "Cboard_Category", nullable = false, length = 10)
    private String cboardCategory; //캠퍼 게시글 말머리

    @Column(name = "Cboard_Title", nullable = false, length = 50)
    private String cboardTitle;    //캠퍼 게시판 글 제목

    @Column(name = "Cboard_Content", nullable = false, length = 1000)
    private String cboardContent;  //캠퍼 게시판 글 내용

    @Column(name = "Cboard_Views", nullable = false, precision = 50)
    private Long cboardViews;      //게시글 조회수

    @Column(name = "Cboard_Date", nullable = false)
    private String cboardDate;       //캠퍼게시판 게시글 작성일자

    @Column(name = "Cboard_Attachment", nullable = true, length = 200)
    private String cboardAttachment;    //파일 첨부여부(url,링크)

    @PrePersist
    protected void onCreate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        cboardDate = sdf.format(new Date());  // 현재 날짜를 패턴에 맞춰 저장한다
    }
}
