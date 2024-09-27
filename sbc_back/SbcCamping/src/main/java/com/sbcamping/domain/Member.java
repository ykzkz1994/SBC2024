package com.sbcamping.domain;


import jakarta.persistence.*;
import lombok.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Getter
@Table
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, name = "MEMBER_ID", columnDefinition = "NUMBER(10,0)")
    private Long memberID; // 회원 번호 (자동생성)

    @Column(length = 50, nullable = false)
    private String memberEmail; // 회원 이메일

    @Column(name = "Member_Password", length = 200, nullable = false)
    private String memberPw; // 회원 비밀번호

    @Column(length = 10, nullable = false)
    private String memberName; // 회원 명

    @Column(length = 11, nullable = false)
    private String memberPhone; // 회원 핸드폰번호

    @Column(nullable = false, length = 1)
    private char memberGender; // 회원 성별

    @Column(nullable = false)
    private String memberBirth; // 회원 생년월일


    @Column(length = 30, nullable = false)
    private String memberLocal; // 회원 지역

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date memberRegDate; // 회원 등록일

    @Column(name = "MEMBER_STATUS", nullable = false, length = 3, columnDefinition = "CHAR(3)")
    @Builder.Default
    private String memberStatus = "ON"; // 회원 상태

    @Column(length = 10, nullable = false)
    @Builder.Default
    private String memberRole = "ROLE_USER"; // 회원 권한

}