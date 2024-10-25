package com.sbcamping.admin.stats.service;

import com.sbcamping.admin.stats.dto.*;
import com.sbcamping.admin.stats.repository.StatsRepository;
import com.sbcamping.domain.Reservation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
public class ResSalesStatsServiceImpl implements ResSalesStatsService {

    private final StatsRepository statsRepository;

    private static final String DAY = "day";
    private static final String MONTH = "month";
    private static final String YEAR = "year";

    @Override
    public SalesStatsResponseDTO sales(String dateType, LocalDate startDate, LocalDate endDate, Long siteId) {
        // startDate와 endDate가 올바른 범위인지 확인
        log.info("Date range: {} to {}", startDate, endDate);
        log.info("Fetching sales data: dateType={}, startDate={}, endDate={}, siteId={}", dateType, startDate, endDate, siteId);

        List<Reservation> reservations = (siteId == null)
                ? statsRepository.findByDateBetween(startDate, endDate)
                : statsRepository.findByDateBetweenAndSiteId(startDate, endDate, siteId);

        log.info("Found {} reservations", reservations.size());

        Map<String, ResSalesResultDTO> salesResultMap = createDateRangeMap(startDate, endDate, dateType);
        processReservations(reservations, salesResultMap, dateType);

        Map<Long, SiteSalesInfo> siteTotals = calculateSiteTotals(salesResultMap);
        Map<String, Object> totalStats = createTotalStats(salesResultMap);

        return new SalesStatsResponseDTO(new ArrayList<>(salesResultMap.values()), totalStats, siteTotals);
    }

    private Map<String, ResSalesResultDTO> createDateRangeMap(LocalDate startDate, LocalDate endDate, String dateType) {
        Map<String, ResSalesResultDTO> resultMap = new TreeMap<>();

        switch (dateType) {
            case DAY:
                for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                    resultMap.put(date.toString(), new ResSalesResultDTO(date));
                }
                break;
            case MONTH:
                for (LocalDate date = startDate.withDayOfMonth(1); !date.isAfter(endDate); date = date.plusMonths(1)) {
                    resultMap.put(date.format(DateTimeFormatter.ofPattern("yyyy-MM")), new ResSalesResultDTO(date));
                }
                break;
            case YEAR:
                for (int year = startDate.getYear(); year <= endDate.getYear(); year++) {
                    for (int month = 1; month <= 12; month++) {
                        LocalDate date = LocalDate.of(year, month, 1);
                        resultMap.put(date.format(DateTimeFormatter.ofPattern("yyyy-MM")), new ResSalesResultDTO(date));
                    }
                }
                break;
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }

        return resultMap;
    }

    private void processReservations(List<Reservation> reservations, Map<String, ResSalesResultDTO> salesResultMap, String dateType) {
        LocalDate today = LocalDate.now();

        for (Reservation reservation : reservations) {
            LocalDate resDate = reservation.getResDate();
            double amount = reservation.getResTotalPay();
            boolean isScheduled = reservation.getCheckinDate().isAfter(today);
            long siteId = reservation.getSite().getSiteId();

            String key = (dateType.equals(MONTH)) ? getKey(resDate, MONTH) : getKey(resDate, DAY);
            ResSalesResultDTO dto = salesResultMap.get(key);
            if (dto == null) continue;

            if (isScheduled) {
                dto.addScheduledSale(siteId, amount);
            } else {
                dto.addCompletedSale(siteId, amount);
            }
        }
    }

    private Map<Long, SiteSalesInfo> calculateSiteTotals(Map<String, ResSalesResultDTO> salesResultMap) {
        Map<Long, SiteSalesInfo> siteTotals = new HashMap<>();

        for (ResSalesResultDTO dto : salesResultMap.values()) {
            for (Map.Entry<Long, SiteSalesInfo> entry : dto.getSiteSalesMap().entrySet()) {
                Long siteId = entry.getKey();
                SiteSalesInfo siteSalesInfo = entry.getValue();

                siteTotals.putIfAbsent(siteId, new SiteSalesInfo());
                siteTotals.get(siteId).addSales(siteSalesInfo.getTotalAmount());
            }
        }

        return siteTotals;
    }

    private Map<String, Object> createTotalStats(Map<String, ResSalesResultDTO> salesResultMap) {
        int totalCompletedCount = 0;
        double totalCompletedAmount = 0;
        int totalScheduledCount = 0;
        double totalScheduledAmount = 0;

        for (ResSalesResultDTO dto : salesResultMap.values()) {
            totalCompletedCount += dto.getCompletedCount();
            totalCompletedAmount += dto.getCompletedAmount();
            totalScheduledCount += dto.getScheduledCount();
            totalScheduledAmount += dto.getScheduledAmount();
        }

        return Map.of(
                "totalCompletedCount", totalCompletedCount,
                "totalCompletedAmount", totalCompletedAmount,
                "totalScheduledCount", totalScheduledCount,
                "totalScheduledAmount", totalScheduledAmount
        );
    }

    @Override
    public CancelStatsResponseDTO cancel(String dateType, LocalDate startDate, LocalDate endDate, Long siteId) {
        if (endDate == null) {
            endDate = determineEndDate(startDate, dateType);
        }

        log.info("Processed date range: startDate={}, endDate={}", startDate, endDate);

        List<Reservation> cancelledReservations = (siteId == null)
                ? statsRepository.findCancelByDateBetween(startDate, endDate)
                : statsRepository.findCancelByDateBetweenAndSiteId(startDate, endDate, siteId);

        log.info("Found {} cancelled reservations", cancelledReservations.size());

        Map<String, ResCancelResultDTO> cancelResultMap = createCancelDateRangeMap(startDate, endDate, dateType);
        processCancelledReservations(cancelledReservations, cancelResultMap);

        return new CancelStatsResponseDTO(new ArrayList<>(cancelResultMap.values()), createCancelTotalStats(cancelResultMap));
    }

    private LocalDate determineEndDate(LocalDate startDate, String dateType) {
        switch (dateType.toLowerCase()) {
            case DAY:
                return startDate;
            case MONTH:
                return YearMonth.from(startDate).atEndOfMonth();
            case YEAR:
                return startDate.withMonth(12).withDayOfMonth(31);
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }
    }

    private Map<String, ResCancelResultDTO> createCancelDateRangeMap(LocalDate startDate, LocalDate endDate, String dateType) {
        Map<String, ResCancelResultDTO> resultMap = new TreeMap<>();

        switch (dateType) {
            case DAY:
                for (Reservation reservation : statsRepository.findCancelByDateBetween(startDate, endDate)) {
                    LocalDate cancelDate = reservation.getResCancelDate();
                    resultMap.putIfAbsent(cancelDate.toString(), new ResCancelResultDTO(cancelDate));
                }
                break;
            case MONTH:
                for (LocalDate date = startDate.withDayOfMonth(1); !date.isAfter(endDate); date = date.plusMonths(1)) {
                    resultMap.put(date.toString(), new ResCancelResultDTO(date));
                }
                break;
            case YEAR:
                for (YearMonth yearMonth = YearMonth.from(startDate); !yearMonth.isAfter(YearMonth.from(endDate)); yearMonth = yearMonth.plusMonths(1)) {
                    resultMap.put(yearMonth.toString(), new ResCancelResultDTO(yearMonth.atDay(1)));
                }
                break;
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }

        return resultMap;
    }

    private void processCancelledReservations(List<Reservation> cancelledReservations, Map<String, ResCancelResultDTO> resultMap) {
        for (Reservation reservation : cancelledReservations) {
            LocalDate cancelDate = reservation.getResCancelDate();
            double amount = reservation.getResTotalPay();

            String key = getKey(cancelDate, DAY);
            ResCancelResultDTO dto = resultMap.get(key);
            if (dto == null && DAY.equals(key)) {
                dto = new ResCancelResultDTO(cancelDate);
                resultMap.put(key, dto);
            }
            if (dto != null) {
                dto.setCancelCount(dto.getCancelCount() + 1);
                dto.setCancelAmount(dto.getCancelAmount() + amount);
            }
        }
    }

    private Map<String, Object> createCancelTotalStats(Map<String, ResCancelResultDTO> resultMap) {
        int totalCancelCount = 0;
        double totalCancelAmount = 0;

        for (ResCancelResultDTO dto : resultMap.values()) {
            totalCancelCount += dto.getCancelCount();
            totalCancelAmount += dto.getCancelAmount();
        }

        return Map.of(
                "totalCancelCount", totalCancelCount,
                "totalCancelAmount", totalCancelAmount
        );
    }

    private String getKey(LocalDate date, String dateType) {
        switch (dateType) {
            case DAY:
            case MONTH:
                return date.toString();
            case YEAR:
                return YearMonth.from(date).toString();
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }
    }
}
