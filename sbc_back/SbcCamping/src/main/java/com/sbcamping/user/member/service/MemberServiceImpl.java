package com.sbcamping.user.member.service;

import com.sbcamping.domain.Member;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@Slf4j
public class MemberServiceImpl implements MemberService{

    private MemberRepository memberRepository;

    // 회원 등록
    @Override
    public void addMember(Member member) {
        memberRepository.save(member);
    }

    // 회원 정보 수정
    @Override
    public void updateMember(Long memberID, MemberDTO memberDTO) {

        // 회원번호로 회원 조회
        Member member = memberRepository.findById(memberID).get();

        // 수정할 값이 있으면 수정
        if(memberDTO.getMemberPhone() != null) {
            member.changePhone(memberDTO.getMemberPhone());
        }
        if(memberDTO.getMemberBirth() != null) {
            member.changeBirth(memberDTO.getMemberBirth());
        }
        Character gen = memberDTO.getMemberGender();
        if(gen != null) {
            member.changeGender(memberDTO.getMemberGender());
        }
        if(memberDTO.getMemberLocal() != null) {
            member.changeLocal(memberDTO.getMemberLocal());
        }
        if(memberDTO.getMemberName() != null) {
            member.changeName(memberDTO.getMemberName());
        }
        if(memberDTO.getPassword() != null){
            member.changePw(memberDTO.getPassword()
            );
        }

        // 회원정보 수정
        memberRepository.save(member);
    }

    // 회원 삭제
    @Override
    public void deleteMember(Long memberID) {
        memberRepository.deleteById(memberID);
    }

    // 회원 조회
    @Override
    public Member getMember(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        return member.orElse(null);
    }


}
