package com.sbcamping.admin.member.service;

import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class ServiceTest {

    @Autowired
    private MemberService memberService;

    @Test
    public void test() {


    }
}
