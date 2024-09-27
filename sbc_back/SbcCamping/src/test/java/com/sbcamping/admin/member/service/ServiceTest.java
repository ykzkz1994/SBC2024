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
import java.util.List;

@SpringBootTest
@Log4j2
public class ServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;


    @Test
    public void test() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("memberID").ascending());
        Page<Member> page = memberRepository.findByMemberNameContaining("반", pageable);

        List<Member> members = page.getContent();

        log.info(page);
        log.info(members);
    }
}
