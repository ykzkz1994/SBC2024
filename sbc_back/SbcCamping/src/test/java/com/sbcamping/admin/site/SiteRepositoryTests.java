package com.sbcamping.admin.site;

import com.sbcamping.admin.site.repository.SiteRepository;
//import lombok.extern.logj.Log4j2;  //원래 쓰던 로깅
import com.sbcamping.domain.Site;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;   //최근 스탠다드 버전 로깅
//import lombok.extern.slf4j.XSlf4j;  //패키지 경로까지 찍어줌
import org.hibernate.sql.Update;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.util.Optional;

@SpringBootTest //테스트 클래스에 붙이는 어노테이션
@Transactional //테스트 완료후 데이터베이스를 롤백해주는 어노테이션
@Slf4j
public class SiteRepositoryTests {

    @Autowired //의존성 주입 자동어노테이션
    private SiteRepository siteRepository;


    @Test //
    @DisplayName("site 객체 만들어서 값 할당 후 객체를 DB에 저장 ") //테스트 할 때 보기 편하게 지정해주는 어노테이션
    @Commit //커밋이 없어서 안됐구나
    public void testCreateSite() {
        // Site 객체 생성
        Site site = Site.builder()
                .siteName("E 구역")
                .siteIsavailable('Y')
                .siteResLimit('N')
                .siteWeekendPay(10000L)
                .siteWeekdayPay(70000L)
                .siteMinPeople(4L)
                .siteMaxPeople(6L)
                .build();

        //생성한 객체를 DB에 저장함
        log.info("------------------------------------------------------------------------------");
        siteRepository.save(site);
        log.info("------------------------------------------------------------------------------");

        log.info(site != null ? site.toString() : "site is null");
        log.info("------------------------------------------------------------------------------");
        log.info(siteRepository.findAll().toString()); //다 받아와서 출력
        log.info("------------------------------------------------------------------------------");
    }



    //이 새끼 왜 되다 안되다함?
    @Test
    @DisplayName("Site 수정 테스트 ")
    @Commit //클래스에서 선언한 트렌젝션을 적용하지 않고 커밋을 하기 위함
    public void UpdateSite() {
        /*CamperBoard camperBoard = camperRepository.findById(3L).orElseThrow();*/
        Optional<Site> result = siteRepository.findById(1L);
        Site site = result.orElseThrow();

        site.changeSiteName("왜 안대냐고 6트");
        site.changeIsAvailable('N');
        site.changeResLimit('N');
        site.changeWeekendPay(10000L);
        site.changeWeekdayPay(50000L);
        site.changeMinPeople(5L);
        site.changeMaxPeople(6L);
        siteRepository.save(site);
    }


}

