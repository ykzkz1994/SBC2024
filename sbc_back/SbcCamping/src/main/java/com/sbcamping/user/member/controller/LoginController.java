package com.sbcamping.user.member.controller;

import com.sbcamping.user.member.service.MemberServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private MemberServiceImpl memberService;

    // 이메일 중복체크 (구조명세서 변경하기)
    @GetMapping("/auth/emailcheck")
    public Map<String,String> emailCheck(@RequestParam String email){
        log.info("이메일 중복체크 메소드");
        String msg = memberService.emailCheck(email);
        log.info("msg : {}", msg );
        Map<String,String> map = new HashMap<>();
        map.put("msg",msg);
        return map;
    }

}
