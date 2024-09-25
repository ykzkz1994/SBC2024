package com.sbcamping.admin.site;

import com.sbcamping.admin.site.repository.SiteRepository;
//import lombok.extern.logj.Log4j2;  //원래 쓰던 로깅
import lombok.extern.slf4j.Slf4j;   //최근 스탠다드 버전 로깅
//import lombok.extern.slf4j.XSlf4j;  //패키지 경로까지 찍어줌
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest //테스트 클래스에 붙이는 어노테이션
@Slf4j
public class SiteRepositoryTests {

    @Autowired //의존성 주입 자동어노테이션
    private SiteRepository siteRepository;

    @Test
    public void test1(){
        log.info("---------------");
        log.info(SiteRepository);
        log.info("---------------");

    }

}
