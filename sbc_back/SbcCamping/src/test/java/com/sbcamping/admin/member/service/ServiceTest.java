package com.sbcamping.admin.member.service;

import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.admin.member.repository.MemberRepository;
import com.sbcamping.domain.Member;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@SpringBootTest
@Log4j2
public class ServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Commit
    @Transactional
    @Test
    public void test() {
        Member member = Member.builder().memberEmail("hong@naver.com").memberGender('F').memberPw("1234").memberBirth("19921010").memberPhone("01011117896").memberName("반길동").memberLocal("충남").memberRole("ROLE_USER").memberRegDate(new Date(2020/10/10)).memberStatus("OFF").build();

        memberRepository.save(member);
        log.info(member);

    }
}
