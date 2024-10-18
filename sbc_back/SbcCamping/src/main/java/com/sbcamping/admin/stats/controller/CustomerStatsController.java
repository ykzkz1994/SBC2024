package com.sbcamping.admin.stats.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/admin/stats/customer")
public class CustomerStatsController {


    // 2. 고객 통계 : 기간별 조회
    //@GetMapping("/customer")

    // 2-1 누적 예약 고객수, 일 평균 예약 고객수, 재예약 고객 비율

    // 2-2 성별, 연령별
    // 2-2-1 성별 /gender
    // 2-2-2 연령별 /age
    // 2-2-3 성별&연령별 /genderAge

    // 2-3 지역별 / local

    // 2-4 최다 예약 & 최다 취소 고객 명단 /performance

    // 2-5 고객 리뷰 현황 (리뷰 테이블 생성 후 만들기)


}
