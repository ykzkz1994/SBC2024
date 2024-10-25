package com.sbcamping.admin.stats.service;

import com.sbcamping.admin.stats.dto.CustomerStatsReqDTO;
import com.sbcamping.admin.stats.repository.ReviewStatsRepository;
import com.sbcamping.admin.stats.repository.StatsRepository;
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Review;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class CustomerStatsServiceImpl implements CustomerStatsService {

    @Autowired
    private StatsRepository statsRepository; // reservation -> member

    @Autowired
    private ReviewStatsRepository reviewStatsRepository;  // review

    // 해당 기간의 예약 데이터 불러오기
    private List<Reservation> getReservations(LocalDate startDate, LocalDate endDate, Long siteId) {
        if (siteId == null) {
            return statsRepository.findByDateBetween(startDate, endDate);
        } else {
            return statsRepository.findByDateBetweenAndSiteId(startDate, endDate, siteId);
        }
    }

    // 고객 통계 : 성별, 연령별, 지역별
    // 고객 통계 : 성별, 연령별, 지역별
    public Map<String, Object> getAllCustomerStats(LocalDate startDate, LocalDate endDate, String dateType, Long siteId) {
        Map<String, Object> allStats = new HashMap<>();  // 타입을 Object로 변경
        allStats.put("genderStats", getGenderStats(startDate, endDate, dateType, siteId));
        allStats.put("ageStats", getAgeStats(startDate, endDate, dateType, siteId));
        allStats.put("localStats", getLocalStats(startDate, endDate, dateType, siteId));

        allStats.put("totalReservationStats", getTotalAndAverageReservationStats(startDate, endDate, siteId));
        allStats.put("rebookingRate", getRebookingRate(startDate, endDate, siteId));
        allStats.put("mostFrequentReservationCustomer", getMostFrequentReservationCustomer(startDate, endDate, siteId));
        allStats.put("mostFrequentCancellationCustomer", getMostFrequentCancellationCustomer(startDate, endDate, siteId));


        return allStats;
    }

    public Map<String, Long> getGenderStats(LocalDate startDate, LocalDate endDate, String dateType, Long siteId) {
        log.info("Executing getGenderStats: startDate={}, endDate={}, siteId={}", startDate, endDate, siteId);

        List<Reservation> reservations = getReservations(startDate, endDate, siteId); // 공통 메서드 호출

        if (reservations == null || reservations.isEmpty()) {
            log.warn("No reservations found for the given date range: {} to {}", startDate, endDate);
            return new HashMap<>(); // 빈 Map 반환
        }

        return reservations.stream()
                .map(r -> String.valueOf(r.getMember().getMemberGender()))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting())); // 직접 Map 생성
    }

    public Map<String, Long> getAgeStats(LocalDate startDate, LocalDate endDate, String dateType, Long siteId) {
        log.info("Executing getAgeStats: startDate={}, endDate={}, siteId={}", startDate, endDate, siteId);
        List<Reservation> reservations = getReservations(startDate, endDate, siteId); // 공통 메서드 호출

        if (reservations == null || reservations.isEmpty()) {
            log.warn("No reservations found for the given date range: {} to {}", startDate, endDate);
            return new HashMap<>(); // 빈 Map 반환
        }

        return reservations.stream()
                .map(r -> calculateAgeGroup(r.getMember().getMemberBirth()))  // birthDate를 나이 그룹으로 변환
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting())); // 나이 그룹별로 카운팅
    }


    public Map<String, Long> getLocalStats(LocalDate startDate, LocalDate endDate, String dateType, Long siteId) {
        log.info("Executing getLocalStats: startDate={}, endDate={}, siteId={}", startDate, endDate, siteId);
        List<Reservation> reservations = getReservations(startDate, endDate, siteId); // 공통 메서드 호출

        if (reservations == null || reservations.isEmpty()) {
            log.warn("No reservations found for the given date range: {} to {}", startDate, endDate);
            return new HashMap<>(); // 빈 Map 반환
        }

        return reservations.stream()
                .map(r -> String.valueOf(r.getMember().getMemberLocal()))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting())); // 직접 Map 생성

    }

    // 총 누적 예약 고객수와 일 평균 예약 고객수
    public Map<String, Object> getTotalAndAverageReservationStats(LocalDate startDate, LocalDate endDate, Long siteId) {
        List<Reservation> reservations = getReservations(startDate, endDate, siteId);
        if (reservations == null || reservations.isEmpty()) {
            return new HashMap<>();
        }

        long totalReservations = reservations.size();  // 총 예약 건수
        long daysBetween = ChronoUnit.DAYS.between(startDate, endDate) + 1;  // 시작일과 종료일 간의 일수
        double averageReservations = totalReservations / (double) daysBetween;  // 일 평균 예약 고객수

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalReservations", totalReservations);
        stats.put("averageReservationsPerDay", averageReservations);

        return stats;
    }

    // 재예약 고객 비율
    public double getRebookingRate(LocalDate startDate, LocalDate endDate, Long siteId) {
        List<Reservation> reservations = getReservations(startDate, endDate, siteId);
        if (reservations == null || reservations.isEmpty()) {
            return 0.0;
        }

        Set<Long> uniqueCustomers = new HashSet<>();  // 최초 예약 고객 집합
        Set<Long> rebookedCustomers = new HashSet<>();  // 재예약 고객 집합

        for (Reservation reservation : reservations) {
            Long customerId = reservation.getMember().getMemberID();
            if (uniqueCustomers.contains(customerId)) {
                rebookedCustomers.add(customerId);
            } else {
                uniqueCustomers.add(customerId);
            }
        }

        double rebookingRate = rebookedCustomers.size() / (double) uniqueCustomers.size();
        return rebookingRate * 100;  // 비율을 퍼센트로 반환
    }

    // 최다 예약 고객
    public Map<String, Object> getMostFrequentReservationCustomer(LocalDate startDate, LocalDate endDate, Long siteId) {
        List<Reservation> reservations = getReservations(startDate, endDate, siteId);
        if (reservations == null || reservations.isEmpty()) {
            return new HashMap<>();
        }

        Map<Long, Long> customerReservationCounts = reservations.stream()
                .map(r -> r.getMember().getMemberID())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        // 가장 많이 예약한 고객 찾기
        return customerReservationCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(entry -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("customerId", entry.getKey());
                    result.put("reservationCount", entry.getValue());
                    return result;
                })
                .orElse(new HashMap<>());
    }

    // 최다 취소 고객
    public Map<String, Object> getMostFrequentCancellationCustomer(LocalDate startDate, LocalDate endDate, Long siteId) {
        List<Reservation> reservations = getReservations(startDate, endDate, siteId);
        if (reservations == null || reservations.isEmpty()) {
            return new HashMap<>();
        }

        // 예약 상태가 '취소'인 고객만 필터링
        Map<Long, Long> customerCancellationCounts = reservations.stream()
                .filter(r -> r.getResStatus().equals("예약취소"))  // 취소 상태 체크
                .map(r -> r.getMember().getMemberID())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        // 가장 많이 취소한 고객 찾기
        return customerCancellationCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(entry -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("customerId", entry.getKey());
                    result.put("cancellationCount", entry.getValue());
                    return result;
                })
                .orElse(new HashMap<>());
    }

    private String calculateAgeGroup(String birthDate) {
        if (birthDate == null || birthDate.isEmpty()) {
            log.warn("Birth date is null or empty");
            return "Unknown";  // 생일이 null 또는 빈 문자열인 경우 처리
        }

        // yyyyMMdd 형식의 DateTimeFormatter
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        try {
            // birthDate를 LocalDate로 변환
            LocalDate birth = LocalDate.parse(birthDate, formatter);
            int age = Period.between(birth, LocalDate.now()).getYears();

            // 나이에 따라 그룹화
            if (age < 20) {
                return "10대";
            } else if (age < 30) {
                return "20대";
            } else if (age < 40) {
                return "30대";
            } else if (age < 50) {
                return "40대";
            } else if (age < 60) {
                return "50대";
            } else if (age < 70) {
                return "60대";
            } else {
                return "70대 이상";
            }
        } catch (DateTimeParseException e) {
            log.warn("Invalid birth date format: {}", birthDate);  // 잘못된 형식 로그 출력
            return "Unknown";  // 오류가 발생하면 "Unknown" 반환
        }
    }

    // 고객 리뷰 통계
    @Override
    public List<CustomerStatsReqDTO> reviews(LocalDate startDate, LocalDate endDate, Long siteId, String dateType) {
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

        List<Review> reviewsList;
        if (siteId == null) {
            reviewsList = reviewStatsRepository.findByDateBetween(startDate, endDate);
        } else {
            reviewsList = reviewStatsRepository.findReviewsByDateRangeAndSiteId(startDate, endDate, siteId);
        }

        log.info("Processing review stats: startDate={}, endDate={}, siteId={}, dateType={}",
                startDate, endDate, siteId, dateType);
        log.info("Found {} reviews", reviewsList.size());

        Map<String, CustomerStatsReqDTO> resultMap = new TreeMap<>();

        // 날짜 범위 생성 및 초기화
        switch (dateType.toLowerCase()) {
            case "day":
                for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                    resultMap.put(date.toString(), new CustomerStatsReqDTO(date));
                }
                break;
            case "month":
                for (YearMonth ym = YearMonth.from(startDate); !ym.isAfter(YearMonth.from(endDate)); ym = ym.plusMonths(1)) {
                    resultMap.put(ym.toString(), new CustomerStatsReqDTO(ym.atDay(1)));
                }
                break;
            case "year":
                for (int year = startDate.getYear(); year <= endDate.getYear(); year++) {
                    resultMap.put(String.valueOf(year), new CustomerStatsReqDTO(LocalDate.of(year, 1, 1)));
                }
                break;
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }

        // 리뷰 데이터 처리
        for (Review review : reviewsList) {
            Date reviewDate = review.getReviewDate();
            String key = getKeyForReview(reviewDate, dateType);

            CustomerStatsReqDTO dto = resultMap.get(key);
            if (dto == null) {
                log.warn("No matching key found for review date: {}. Key: {}", reviewDate, key);
                continue;
            }

            incrementTagCounts(dto, review);
            dto.incrementTotalReviews();
        }

        return new ArrayList<>(resultMap.values());
    }

    private void incrementTagCounts(CustomerStatsReqDTO dto, Review review) {
        if (review == null) {
            log.warn("Null review encountered");
            return;
        }
        if (dto == null) {
            log.warn("Null DTO encountered");
            return;
        }
        if (review.getRtag_Clean() == 'Y') dto.incrementCleanCount();
        if (review.getRtag_Price() == 'Y') dto.incrementPriceCount();
        if (review.getRtag_Facility() == 'Y') dto.incrementFacilityCount();
        if (review.getRtag_Photo() == 'Y') dto.incrementPhotoCount();
        if (review.getRtag_Silence() == 'Y') dto.incrementSilenceCount();
        if (review.getRtag_Kind() == 'Y') dto.incrementKindCount();
        if (review.getRtag_View() == 'Y') dto.incrementViewCount();
    }


    /*
    날짜 파라미터 처리 관련 메소드 모음
    */

    private String getKeyForReview(Date date, String dateType) {
        if (date == null) {
            log.warn("Null date encountered");
            return "Unknown";
        }

        // java.sql.Date를 java.time.LocalDate로 변환
        LocalDate localDate = ((java.sql.Date) date).toLocalDate();

        switch (dateType.toLowerCase()) {
            case "day":
                return localDate.format(DateTimeFormatter.ISO_LOCAL_DATE);
            case "month":
                return localDate.format(DateTimeFormatter.ofPattern("yyyy-MM"));
            case "year":
                return String.valueOf(localDate.getYear());
            default:
                throw new IllegalArgumentException("Invalid date type: " + dateType);
        }
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
}




