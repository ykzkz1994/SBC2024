package com.sbcamping.user.member.controller;

import com.sbcamping.domain.Member;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.service.MemberServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController("userMemberController") //사용자 관련 멤버 컨트롤러
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private MemberServiceImpl memberService;

    // 회원가입
    @PostMapping("/")
    public void join(@RequestBody Member member){
        memberService.addMember(member);
    }


    // 나의 예약내역 조회
    @GetMapping("/memberRes")
    public void getMemberRes(){

    }

    // 예약 상세 내역 조회
    @GetMapping("/{resID}")
    public void getDetailMyRes(@PathVariable(name = "resID") Long resID){

    }

    // 회원개인정보 조회
    @GetMapping("/{memberID}")
    public void GetMemberInfo(@PathVariable(name = "memberID") Long memberID){
        Member member = memberService.getMember(memberID);
    }

    // 비밀번호 인증
    @PostMapping("/pwAuth")
    public void memberPwAuth(){

    }

    // 회원정보 수정
    @PutMapping("/{memberID}")
    public void modifyMember(@PathVariable(name = "memberID") Long memberID, @RequestBody MemberDTO memberDTO){
        memberService.updateMember(memberID, memberDTO);
   }

    // 회원 탈퇴(삭제)
    @DeleteMapping("/{memberID}")
    public void deleteMember(@PathVariable(name = "memberID") Long memberID){
        memberService.deleteMember(memberID);
    }


}
