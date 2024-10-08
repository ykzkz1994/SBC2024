package com.sbcamping.admin.stats.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/stats")
public class StatsController {
    // 1. 예약 매출 통계
    //@GetMapping("/reservation-sales")

    // 2. 고객 통계
    //@GetMapping("/customer")
}
