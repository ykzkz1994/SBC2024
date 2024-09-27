package com.sbcamping.admin.res;

import com.sbcamping.admin.res.repository.ResRepository;
import com.sbcamping.admin.site.repository.SiteRepository; // SiteRepository 추가
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Site;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@SpringBootTest
@Slf4j
public class ResRepositoryTests {

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date checkinDate = sdf.parse("2024-10-01");
    Date checkoutDate = sdf.parse("2024-10-05");

    @Autowired
    private ResRepository resRepository;

    @Autowired //의존성 주입 자동어노테이션
    private SiteRepository siteRepository;

    public ResRepositoryTests() throws ParseException {
    }

    @Test
    @DisplayName("Res 조회 테스트")
    public void testCreateRes() {
        // 참조에 필요한 Site 객체
        Optional<Site> siteOptional = siteRepository.findById(1L);
        Site site = siteOptional.get();

        // Reservation 객체 생성
        Reservation reservation = Reservation.builder()
                .resId("RES123456")
                .checkinDate(checkinDate)
                .checkoutDate(checkoutDate)
                .resPeople(4L)
                .resDate("2024-09-27")
                .resStatus("예약완료")
                .resTotalPay(200000L)
                .resCancelReason(null)
                .resReview('N')
                .resUserName("홍길동")
                .resUserPhone("01012345678")
                .site(site)
                .build();

        // 생성한 객체를 DB에 저장
        log.info("------------------------------------------------------------------------------");
        resRepository.save(reservation); // 객체를 저장
        log.info("Reservation saved: " + reservation);
        log.info("------------------------------------------------------------------------------");

        log.info(site != null ? site.toString() : "site is null");
        log.info("------------------------------------------------------------------------------");
        log.info(resRepository.findAll().toString());
        log.info("------------------------------------------------------------------------------");
    }
}
