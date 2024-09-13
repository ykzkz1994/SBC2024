package com.sbcamping.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "Question_Board_Comment")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionBoardComment { // 문의게시판 댓글

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QBoard_Comment_ID", precision = 10, scale = 2)
    private Long qcommentID;    // 문의 게시판 댓글 번호

    @ManyToOne
    @JoinColumn(name="MEMBER_ID", referencedColumnName = "Member_ID") // 회원 번호(FK)
    private Member member; // 외래 키가 참조하는 엔티티 클래스

    @ManyToOne
    @JoinColumn(name="qboard_id", referencedColumnName = "qboard_id") // 문의 게시판 글 번호(FK)
    private QuestionBoard qboard;  // 외래 키가 참조하는 엔티티 클래스

    @Column(name="Qboard_Comment_Content", length = 200, nullable = false)
    private String qcommentContent; // 댓글 내용

    @Column(name="QBoard_Comment_Date", nullable = false)
    @ColumnDefault("sysdate")
    private String qcommentDate;  // 댓글 작성일

    @PrePersist
    protected void onCreate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        qcommentDate = sdf.format(new Date());  // 현재 날짜를 포맷하여 저장
    }

}
