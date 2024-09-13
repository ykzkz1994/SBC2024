package com.sbcamping.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "Question_Board")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionBoard { // 문의게시판

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Qboard_ID", precision = 10)
    private Long qboardID;  // 문의게시판 글 번호

    @ManyToOne
    @JoinColumn(name="MEMBER_ID", referencedColumnName = "Member_ID") // 회원 번호(FK)
    private Member member; // 외래 키가 참조하는 엔티티 클래스

    @Column(name="QBoard_Title", length= 50 ,nullable = false)
    private String qboardTitle; // 문의 게시판 글 제목

    @Column(name="QBoard_Content", length = 1000, nullable = false)
    private String qboardContent;   // 문의 게시판 글 내용

    @Column(name="QBoard_Attachment", length = 200)
    private String qboardAttachment;    // 문의 게시판 파일 첨부

    @Column(name="Qboard_Views", precision = 50, nullable = false)
    private Long qboardViews;   // 문의 게시판 글 조회수

    @Column(name="QBoard_Date", nullable = false)
    private String qboardDate; // 문의 게시판 글 작성일 (기본값 설정)

    @Column(name="QBoard_asked", length = 1, nullable = false)
    private String qboardAsked = "N"; // 관리자 답변 상태 (기본값 설정)

    @Column(name="QBoard_notice", length = 1, nullable = false)
    private String qboardNotice = "N";    // 공지 여부 (기본값 설정)

    @PrePersist
    protected void onCreate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        qboardDate = sdf.format(new Date());  // 현재 날짜를 포맷하여 저장
    }
}
