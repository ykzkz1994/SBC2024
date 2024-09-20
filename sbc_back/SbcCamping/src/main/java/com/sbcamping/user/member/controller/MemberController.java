package com.sbcamping.user.member.controller;

import com.sbcamping.user.member.service.MemberService;
import com.sbcamping.user.member.service.MemberServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    private MemberServiceImpl memberService;

    // 회원가입
    @PostMapping("/")
    public void join(){

    }

    // 나의 예약내역 조회
    @GetMapping("/memberRes")
    public void getMemberRes(){

    }

    // 예약 상세 내역 조회
    @GetMapping("/getMemberDetailRes")
    public void getDetailMyRes(){

    }

    // 회원정보 조회
    @GetMapping("/{memberID}")
    public void GetMemberInfo(@PathVariable(name = "memberID") Long memberID){

    }



}
