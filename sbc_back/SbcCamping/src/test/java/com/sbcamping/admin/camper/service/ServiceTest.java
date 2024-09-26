package com.sbcamping.admin.camper.service;

import com.sbcamping.admin.camper.dto.CamperDTO;
import com.sbcamping.domain.Member;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
@Log4j2
public class ServiceTest {
    @Autowired
    private CamperService camperService;

//    @Test
//    public void testRegister() {
//        CamperDTO camperDTO = CamperDTO.builder().cbCategory("잡담").cbTitle("테스트 제목").cbContent("테스트 내용")
//                .cbDate(new Date()).cbViews(2L).memberId(1L).build();
//
//        Long cbNo = camperService.register(camperDTO);
//        log.info("CBNO: " +cbNo);
//    }
    @Test
    public void testGet() {
        Long cbNo = 2L;
        CamperDTO camperDTO = camperService.get(cbNo);
        log.info(camperDTO);
    }
}
