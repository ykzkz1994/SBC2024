package com.sbcamping.user.member.controller;

import com.sbcamping.domain.Member;
import com.sbcamping.user.member.service.MemberServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private MemberServiceImpl memberService;

    // 이메일 중복체크 (구조명세서 변경하기)
    @GetMapping("/emailcheck")
    public Map<String,String> emailCheck(@RequestParam String email){
        String msg = memberService.emailCheck(email);
        Map<String,String> map = new HashMap<>();
        map.put("msg",msg);
        return map;
    }

    // 이메일 찾기 (회원명 + 회원 핸드폰번호)
    @PostMapping("/findemail")
    public Map<String,String> findemail(@RequestBody Member member){
        log.info("-----------------이메일 찾기 메소드");
        String email = memberService.findEmail(member.getMemberName(), member.getMemberPhone());
        Map<String,String> map = new HashMap<>();
        map.put("memberEmail",email);
        return map;
    }

    // test
}
