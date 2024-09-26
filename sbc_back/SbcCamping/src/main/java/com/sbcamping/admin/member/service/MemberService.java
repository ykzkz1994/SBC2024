package com.sbcamping.admin.member.service;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.domain.Member;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MemberService {
    public List<Member> list() throws Exception;

    //PageResponseDTO<MemberDTO> totalList(PageRequestDTO pageRequestDTO);    // 회원 전체 리스트
    //PageResponseDTO<MemberDTO> inactiveList(PageRequestDTO pageRequestDTO); // 휴면 회원 리스트
    // 회원 검색
    // 회원 정렬
}
