package com.sbcamping.admin.stats.controller;

import com.sbcamping.admin.stats.service.ResSalesStatsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.YearMonth;

@RestController
@RequiredArgsConstructor
@Log4j2
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/admin/stats/reservation-sales")
public class ResSalesStatsController { // 1. 예약 매출 통계 : 기간별, 사이트별 조회

    @Autowired
    private final ResSalesStatsService service;

    // 1-1 매출 현황 : 금액 가져오기, 예약 건수
    @GetMapping("/sales")
    public ResponseEntity<?> getSalesStats(
            @RequestParam String dateType,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long siteId
    ) {
        LocalDate start = startDate;
        LocalDate end;

        switch (dateType) {
            case "day":
                end = endDate != null ? endDate : start;
                break;
            case "month":
                YearMonth yearMonth = YearMonth.from(start);
                end = yearMonth.atEndOfMonth();
                break;
            case "year":
                end = start.withMonth(12).withDayOfMonth(31);
                break;
            default:
                return ResponseEntity.badRequest().body("Invalid date type");
        }

        return ResponseEntity.ok(service.sales(start, end, siteId, dateType));
    }

    // 1-2 예약 취소 현황 : 예약 상태, (취소 건수, 취소 금액)
    @GetMapping("/cancel")
    public ResponseEntity<?> getCancelledSalesStats(
            @RequestParam String dateType,
            @RequestParam String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) Long siteId
    ) {
        log.info("Received request for cancel stats: dateType={}, startDate={}, endDate={}, siteId={}",
                dateType, startDate, endDate, siteId);

        try {
            LocalDate start = parseDate(startDate, dateType);
            LocalDate end = (endDate != null && !endDate.trim().isEmpty()) ? parseDate(endDate, dateType) : null;

            return ResponseEntity.ok(service.cancel(start, end, siteId, dateType));
        } catch (Exception e) {
            log.error("Error processing cancel stats request", e);
            return ResponseEntity.badRequest().body("Error processing request: " + e.getMessage());
        }
    }

    private LocalDate parseDate(String date, String dateType) {
        if (date == null || date.trim().isEmpty()) {
            throw new IllegalArgumentException("Date string cannot be null or empty");
        }

        switch (dateType.toLowerCase()) {
            case "day":
                return LocalDate.parse(date);
            case "month":
                if (date.length() == 7) { // Format: yyyy-MM
                    return YearMonth.parse(date).atDay(1);
                } else {
                    return LocalDate.parse(date);
                }
            case "year":
                if (date.length() == 4) { // Format: yyyy
                    return LocalDate.of(Integer.parseInt(date), 1, 1);
                } else {
                    return LocalDate.parse(date);
                }
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }
    }
}
