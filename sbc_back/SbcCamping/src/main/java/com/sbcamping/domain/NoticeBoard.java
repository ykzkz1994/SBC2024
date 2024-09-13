package com.sbcamping.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Date;

@Entity
@SequenceGenerator(name = "NOTICE_BOARD_SEQ_GEN", // 시퀀스 제너레이터 이름
            sequenceName = "NOTICE_BOARD_SEQ", // 시퀀스 이름
            initialValue = 1, //시작값
            allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "Notice_Board") // 실제 DB 테이블 명
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTICE_BOARD_SEQ_GEN")
    //Long = scale    String,Char = length
    @Column(name = "nboard_Id", nullable = false, precision = 10)          // 공지사항 글 번호
    private Long nboardID;

    @Column(name = "nboard_Title", nullable = false, length = 50)       // 공지사항 글 제목
    private String nboardTitle;

    @Column(name = "nboard_Content", nullable = false, length = 1000)   // 공지사항 글 내용
    private String nboardContent;

    @Column(name = "nboard_Date", nullable = false) //작성일
    @ColumnDefault("sysdate")
    private Date nboardDate;

    @Column(name = "nboard_Views", nullable = false, length = 50)       // 조회수
    private String nboardViews;
}
