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
    public PageResponseDTO<MemberDTO> fullList(PageRequestDTO requestDTO, String keyword) {
        Pageable pageable = null;

        if (keyword == null) {
            pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by("memberID").ascending());
        } else {
            if (String.valueOf(keyword.charAt(0)).equals("-")) {
                pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by(keyword.substring(1)).descending());
            } else {
                pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by(keyword).ascending());
            }
        }

        Page<Member> members = memberRepository.findAll(pageable);

        log.info("member?! : " + members.getContent());

        long totalCount = members.getTotalElements();

        List<MemberDTO> dtoList = members.getContent().stream().map(member -> modelMapper.map(member, MemberDTO.class)).collect(Collectors.toList());

        return PageResponseDTO.<MemberDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(requestDTO)
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<MemberDTO> inactiveFullList(PageRequestDTO requestDTO, String keyword) {
        Pageable pageable = null;

        if (keyword == null) {
            pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by("memberID").ascending());
        } else {
            if (String.valueOf(keyword.charAt(0)).equals("-")) {
                pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by(keyword.substring(1)).descending());
            } else {
                pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by(keyword).ascending());
            }
        }

        Page<Member> members = memberRepository.selectInactive(pageable);

        log.info("member?! : " + members.getContent());

        long totalCount = members.getTotalElements();

        List<MemberDTO> dtoList = members.getContent().stream().map(member -> modelMapper.map(member, MemberDTO.class)).collect(Collectors.toList());

        return PageResponseDTO.<MemberDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(requestDTO)
                .build();
    }
}
