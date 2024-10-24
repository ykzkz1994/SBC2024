package com.sbcamping.admin.stats.service;

import com.sbcamping.admin.stats.dto.ResCancelResultDTO;
import com.sbcamping.admin.stats.dto.ResSalesResultDTO;
import com.sbcamping.admin.stats.repository.StatsRepository;
import com.sbcamping.domain.Reservation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
public class ResSalesStatsServiceImpl implements ResSalesStatsService {

    @Autowired
    private final StatsRepository statsRepository; // reservation -> member

    // 1-1 매출 현황 : 금액 가져오기, 예약 건수
    @Override
    public Map<String, Object> sales(LocalDate startDate, LocalDate endDate, Long siteId, String dateType) {
        List<Reservation> reservations;
        if (siteId == null) {
            reservations = statsRepository.findByDateBetween(startDate, endDate);
        } else {
            reservations = statsRepository.findByDateBetweenAndSiteId(startDate, endDate, siteId);
        }

        Map<String, ResSalesResultDTO> resultMap = new TreeMap<>();
        LocalDate today = LocalDate.now();

        // 날짜 범위 생성
        switch (dateType) {
            case "day":
                for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                    resultMap.put(date.toString(), new ResSalesResultDTO(date));
                }
                break;
            case "month":
                LocalDate monthStart = startDate.withDayOfMonth(1);
                LocalDate monthEnd = endDate.withDayOfMonth(endDate.lengthOfMonth());
                for (LocalDate date = monthStart; !date.isAfter(monthEnd); date = date.plusDays(1)) {
                    resultMap.put(date.toString(), new ResSalesResultDTO(date));
                }
                break;
            case "year":
                for (int year = startDate.getYear(); year <= endDate.getYear(); year++) {
                    for (int month = 1; month <= 12; month++) {
                        LocalDate date = LocalDate.of(year, month, 1);
                        resultMap.put(date.format(DateTimeFormatter.ofPattern("yyyy-MM")), new ResSalesResultDTO(date));
                    }
                }
                break;
        }

        // 예약 데이터 처리
        for (Reservation reservation : reservations) {
            LocalDate resDate = reservation.getResDate();
            double amount = reservation.getResTotalPay();
            boolean isScheduled = reservation.getCheckinDate().isAfter(today);

            String key = getKey(resDate, dateType);
            ResSalesResultDTO dto = resultMap.get(key);
            if (dto == null) continue;

            if (isScheduled) {
                dto.setScheduledAmount(dto.getScheduledAmount() + amount);
                dto.setScheduledCount(dto.getScheduledCount() + 1);
            } else {
                dto.setCompletedAmount(dto.getCompletedAmount() + amount);
                dto.setCompletedCount(dto.getCompletedCount() + 1);
            }
        }

        // 총계 계산
        int totalCompletedCount = 0;
        double totalCompletedAmount = 0;
        int totalScheduledCount = 0;
        double totalScheduledAmount = 0;

        for (ResSalesResultDTO dto : resultMap.values()) {
            totalCompletedCount += dto.getCompletedCount();
            totalCompletedAmount += dto.getCompletedAmount();
            totalScheduledCount += dto.getScheduledCount();
            totalScheduledAmount += dto.getScheduledAmount();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("stats", new ArrayList<>(resultMap.values()));
        response.put("totalStats", Map.of(
                "totalCompletedCount", totalCompletedCount,
                "totalCompletedAmount", totalCompletedAmount,
                "totalScheduledCount", totalScheduledCount,
                "totalScheduledAmount", totalScheduledAmount
        ));

        return response;
    }

    private String getKey(LocalDate date, String dateType) {
        switch (dateType) {
            case "day":
            case "month":
                return date.toString(); // yyyy-MM-dd
            case "year":
               //return date.format(DateTimeFormatter.ofPattern("yyyy-MM"));
                return YearMonth.from(date).toString(); // yyyy-MM
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }
    }

    private LocalDate getKeyDate(LocalDate date, String dateType) {
        switch (dateType) {
            case "day":
                return date;
            case "month":
                return date.withDayOfMonth(1);
            case "year":
                return date.withMonth(1).withDayOfMonth(1);
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }
    }

    // 1-3 예약 취소 현황 : 예약 상태, (취소 건수, 취소 금액)
    @Override
    public Map<String, Object> cancel(LocalDate startDate, LocalDate endDate, Long siteId, String dateType) {
        // endDate가 null일 경우 처리
        if (endDate == null) {
            switch (dateType.toLowerCase()) {
                case "day":
                    endDate = startDate;
                    break;
                case "month":
                    endDate = YearMonth.from(startDate).atEndOfMonth();
                    break;
                case "year":
                    endDate = startDate.withMonth(12).withDayOfMonth(31);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid date type: " + dateType);
            }
        }

        log.info("Processed date range: startDate={}, endDate={}", startDate, endDate);

        List<Reservation> cancelledReservations;
        if (siteId == null) {
            cancelledReservations = statsRepository.findCancelByDateBetween(startDate, endDate);
        } else {
            cancelledReservations = statsRepository.findCancelByDateBetweenAndSiteId(startDate, endDate, siteId);
        }

        log.info("Processing cancel stats: startDate={}, endDate={}, siteId={}, dateType={}",
                startDate, endDate, siteId, dateType);
        log.info("Found {} cancelled reservations", cancelledReservations.size());

        Map<String, ResCancelResultDTO> resultMap = new TreeMap<>();

        // 날짜 범위 생성
        switch (dateType) {
            case "day":
                // 일간 조회: 데이터가 있는 날짜만 포함
                for (Reservation reservation : cancelledReservations) {
                    LocalDate cancelDate = reservation.getResCancelDate();
                    String key = cancelDate.toString(); // yyyy-MM-dd
                    resultMap.putIfAbsent(key, new ResCancelResultDTO(cancelDate));
                }
                break;
            case "month":
                // 월간 조회: 해당 월의 모든 날짜 포함
                for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                    String key = date.toString(); // yyyy-MM-dd
                    resultMap.put(key, new ResCancelResultDTO(date));
                }
                break;
            case "year":
                // 연간 조회: 해당 연도의 모든 월 포함
                for (YearMonth yearMonth = YearMonth.from(startDate);
                     !yearMonth.isAfter(YearMonth.from(endDate));
                     yearMonth = yearMonth.plusMonths(1)) {
                    String key = yearMonth.toString(); // yyyy-MM
                    resultMap.put(key, new ResCancelResultDTO(yearMonth.atDay(1)));
                }
                break;
        }

        // 예약 취소 데이터 처리
        for (Reservation reservation : cancelledReservations) {
            LocalDate cancelDate = reservation.getResCancelDate();
            double amount = reservation.getResTotalPay();

            String key = getKey(cancelDate, dateType);
            ResCancelResultDTO dto = resultMap.get(key);
            if (dto == null && dateType.equals("day")) {
                dto = new ResCancelResultDTO(cancelDate);
                resultMap.put(key, dto);
            }
            if (dto != null) {
                dto.setCancelCount(dto.getCancelCount() + 1);
                dto.setCancelAmount(dto.getCancelAmount() + amount);
            }
        }

        // 총계 계산
        int totalCancelCount = 0;
        double totalCancelAmount = 0;

        for (ResCancelResultDTO dto : resultMap.values()) {
            totalCancelCount += dto.getCancelCount();
            totalCancelAmount += dto.getCancelAmount();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("stats", new ArrayList<>(resultMap.values()));
        response.put("totalStats", Map.of(
                "totalCancelCount", totalCancelCount,
                "totalCancelAmount", totalCancelAmount
        ));

        log.info("Processed cancel stats: totalCancelCount={}, totalCancelAmount={}",
                totalCancelCount, totalCancelAmount);

        return response;
    }

}




