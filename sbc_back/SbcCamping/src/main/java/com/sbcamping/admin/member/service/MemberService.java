package com.sbcamping.admin.member.service;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MemberService {

    // 회원 전체 리스트 : (기본값) memberID 내림차순 (정렬) (기본 오름차순) 회원명, 가입일 / (내림차순) -회원명, -가입일
    PageResponseDTO<MemberDTO> fullList(PageRequestDTO requestDTO, String order);

    // 휴면 회원 리스트 : (기본값) memberID 내림차순 (정렬) (기본 오름차순) 회원명, 가입일 / (내림차순) -회원명, -가입일
    PageResponseDTO<MemberDTO> inactiveFullList(PageRequestDTO requestDTO, String order);

    // 회원 검색 : type (name, phone(뒷자리), email 일부분 검색), keyword가 null인 경우 전체리스트 반환
    PageResponseDTO<MemberDTO> searchMember(PageRequestDTO requestDTO, String type, String keyword, String order);
}
