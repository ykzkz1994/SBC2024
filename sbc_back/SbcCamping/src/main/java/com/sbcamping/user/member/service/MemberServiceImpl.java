package com.sbcamping.user.member.service;

import com.sbcamping.domain.Member;
import com.sbcamping.user.member.dto.MemberDTO;
import com.sbcamping.user.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;


    // 이메일 찾기 (회원명 + 회원 핸드폰번호)
    @Override
    public String findEmail(String memberName, String memberPhone) {
        Member member = memberRepository.findByMemberNameAndMemberPhone(memberName, memberPhone);
        log.info("이메일찾기 : " + member.toString());
        String email;
        if(member == null) {
            email = "이메일을 찾을 수 없습니다.";
        } else{
            email = member.getMemberEmail();
        }
        return email;
    }

    // 회원 등록
    @Override
    public void addMember(Member member) {
        String pw = passwordEncoder.encode(member.getMemberPw());
        member.changePw(pw);
        memberRepository.save(member);
    }

    // 이메일 중복 체크
    @Override
    public String emailCheck(String memberEmail) {
        Integer count = memberRepository.countByMemberEmail(memberEmail);
        String msg = "";
        if(count == 0){
            msg = "enable";
        } else{
            msg = "disable";
        }
        return msg;
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
