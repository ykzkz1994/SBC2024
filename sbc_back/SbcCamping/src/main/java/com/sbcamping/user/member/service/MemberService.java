package com.sbcamping.user.member.service;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.user.camper.dto.PageRequestDTO;
import com.sbcamping.user.camper.dto.PageResponseDTO;

import java.util.List;

public interface MemberService {
    void addMember(Member member);
    Member updateMember(Member member);
    Member getMember(Long memberId);
    String emailCheck(String memberEmail);
    String findEmail(String memberName, String memberPhone);
    Member findMemberByNameAndEmail(Member member);
    String updatePw(Member member);
    String authPw(Long memberId, String memberPw);
    List<Reservation> getMemberRes(Long memberId);
    Reservation getResDetail(Long resId);
    void cancelRes(Long resId, String reason);
    String withdraw(Long memberId, String memberPw);
}
