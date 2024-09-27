package com.sbcamping.admin.member.controller;

import com.sbcamping.admin.camper.dto.CamperDTO;
import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.admin.member.service.MemberService;
import com.sbcamping.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/member")
public class MemberController {

    @Autowired
    private final MemberService memberService;

    @GetMapping("/totallist")
    public PageResponseDTO<MemberDTO> totallist(PageRequestDTO pageRequestDTO) {
        log.info("list....."+pageRequestDTO);
        return memberService.fullList(pageRequestDTO);
    }
//    @GetMapping("/inactiveList")  // 휴면 회원 리스트
//    public PageResponseDTO<MemberDTO> inactiveList(PageRequestDTO pageRequestDTO) {
//        log.info(pageRequestDTO);
//        return memberService.inactiveList(pageRequestDTO);
//    }

    @GetMapping("/search")   // 회원 검색
    public ResponseEntity<List<Member>> searchMember(@RequestParam(required = false) String keyword) {
        return null;
    }

    @GetMapping("/sort")   // 리스트 정렬
    public ResponseEntity<List<Member>> sortList(@RequestParam(required = false) String keyword, @RequestParam(required = false) String sort) {
        return null;
    }
}
