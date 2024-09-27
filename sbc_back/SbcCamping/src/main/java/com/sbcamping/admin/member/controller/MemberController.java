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

    @GetMapping("/totalList")
    public PageResponseDTO<MemberDTO> totallist(PageRequestDTO pageRequestDTO,
                                                @RequestParam(required = false) String keyword) {
        log.info("total list..... : "+pageRequestDTO);
         return memberService.fullList(pageRequestDTO, keyword);  // 기본 정렬 : memberID 오름차순

    }

    @GetMapping("/inactiveList")  // 휴면 회원 리스트
    public PageResponseDTO<MemberDTO> inactiveList(PageRequestDTO pageRequestDTO,
                                                   @RequestParam(required = false) String keyword) {
        log.info("inactive list...... : "+pageRequestDTO);
        return memberService.inactiveFullList(pageRequestDTO, keyword);
    }

    @GetMapping("/search")   // 회원 검색
    public ResponseEntity<List<Member>> searchMember(@RequestParam(required = false) String keyword) {
        return null;
    }
}
