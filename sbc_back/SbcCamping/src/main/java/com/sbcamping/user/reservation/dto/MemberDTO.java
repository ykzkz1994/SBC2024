package com.sbcamping.user.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    private Long memberId;
    private String memberEmail;
    private String memberPw;
    private String memberName;
    private String memberPhone;
    private char memberGender;
    private LocalDate memberBirth;
    private String memberLocal;
    private LocalDate memberRegDate;




}
