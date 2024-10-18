package com.sbcamping.admin.stats.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerStatsReqDTO {
    private Long memberID; // 회원 번호

    private String memberEmail; // 회원 이메일

    private String memberName; // 회원 명

    private char memberGender; // 회원 성별

    private String memberBirth; // 회원 생년월일

    private String memberLocal; // 회원 지역

    private String resId; // 예약 번호
}
