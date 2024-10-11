package com.sbcamping.user.member.service;

import com.sbcamping.domain.Member;
import com.sbcamping.user.member.dto.MemberDTO;

public interface MemberService {
    public void addMember(Member member);
    public String updateMember(Long memberID, MemberDTO member);
    public void deleteMember(Long memberID);
    public Member getMember(Long memberId);
    public String emailCheck(String memberEmail);
    public String findEmail(String memberName, String memberPhone);
    public Member findMemberByNameAndEmail(Member member);
    public String updatePw(MemberDTO memberDTO);
    public String authPw(Member member);
}
