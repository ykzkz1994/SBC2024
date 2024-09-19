package com.sbcamping.domain;

import jakarta.persistence.*;
import lombok.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "REVIEW")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_ID", columnDefinition = "NUMBER(10,0)")
    private Long reviewID; // 리뷰 번호

    @Column(name = "REVIEW_TITLE", nullable = false, length = 50)
    private String reviewTitle; // 리뷰 제목

    @Column(name = "REVIEW_CONTENT", nullable = false, length = 1000)
    private String reviewContent; // 리뷰 내용

    @Column(name = "REVIEW_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date reviewDate; // 리뷰 작성일

    @Column(name = "REVIEW_ATTACHMENT", length = 200)
    private String reviewAttachment; // 파일 첨부

    @Column(name = "RTAG_CLEAN", nullable = false, length = 1)
    @Builder.Default
    private char rtag_Clean = 'N'; // 청결 태그

    @Column(name = "RTAG_PRICE", nullable = false, length = 1)
    @Builder.Default
    private char rtag_Price = 'N'; // 가성비 태그

    @Column(name = "RTAG_FACILITY", nullable = false, length = 1)
    @Builder.Default
    private char rtag_Facility = 'N'; // 시설 태그

    @Column(name = "RTAG_PHOTO", nullable = false, length = 1)
    @Builder.Default
    private char rtag_Photo = 'N'; // 사진 태그

    @Column(name = "RTAG_SILENCE", nullable = false, length = 1)
    @Builder.Default
    private char rtag_Silence = 'N'; // 조용 태그

    @Column(name = "RTAG_KIND", nullable = false, length = 1)
    @Builder.Default
    private char rtag_Kind = 'N'; // 친절 태그

    @Column(name = "RTAG_VIEW", nullable = false, length = 1)
    @Builder.Default
    private char rtag_View = 'N'; // 풍경 태그

    @ManyToOne
    @JoinColumn(name = "RES_ID", referencedColumnName = "RES_ID")
    private Reservation review;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", referencedColumnName = "MEMBER_ID")
    private Member member;

}
