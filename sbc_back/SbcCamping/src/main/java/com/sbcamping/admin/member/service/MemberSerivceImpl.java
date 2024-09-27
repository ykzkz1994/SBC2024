package com.sbcamping.admin.member.service;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.admin.member.repository.MemberRepository;
import com.sbcamping.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberSerivceImpl implements MemberService {

    // 자동 주입 대상은 final로!
    @Autowired
    private final ModelMapper modelMapper;

    @Autowired
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<MemberDTO> fullList(PageRequestDTO pagerequestDTO) {
        log.info("getFullList");

        // 페이지 시작 번호가 0부터 시작하므로
        Pageable pageable = PageRequest.of(pagerequestDTO.getPage()-1, pagerequestDTO.getSize(), Sort.by("memberID").ascending());
        Page<Member> members = memberRepository.findAll(pageable);

        log.info("member?! : " + members.getContent());

        long totalCount = members.getTotalElements();

        List<MemberDTO> dtoList = members.getContent().stream().map(member -> modelMapper.map(member, MemberDTO.class)).collect(Collectors.toList());

        return PageResponseDTO.<MemberDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pagerequestDTO)
                .build();
    }



    //    @Override
//    public PageResponseDTO<MemberDTO> totalList(PageRequestDTO pageRequestDTO) {
//        Pageable pageable = PageRequest.of(
//                pageRequestDTO.getPage() -1 , // 1페이지가 0이므로 주의
//                pageRequestDTO.getSize(), Sort.by("memberID").descending());
//
//        Page<Member> result = memberRepository.findAll(pageable);
//
//        List<MemberDTO> dtoList = result.getContent().stream().map(member ->
//                modelMapper.map(member, MemberDTO.class)).collect(Collectors.toList());
//
//        long totalCount = result.getTotalElements();
//
//        PageResponseDTO<MemberDTO> responseDTO = PageResponseDTO.<MemberDTO>withAll()
//                .dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();
//
//        return responseDTO;
//    }
//
//    @Override
//    public PageResponseDTO<MemberDTO> inactiveList(PageRequestDTO pageRequestDTO) {
//        return null;
//    }
}
