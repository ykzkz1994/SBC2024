package com.sbcamping.admin.stats.service;

import com.sbcamping.admin.stats.dto.CustomerStatsReqDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


public interface CustomerStatsService {


    // 2-5 고객 리뷰 통계
    public List<CustomerStatsReqDTO> reviews(LocalDate startDate, LocalDate endDate, Long siteID, String dateType);

    // 고객 통계 : 나이, 성별, 지역
    public Map<String, Long> getGenderStats(LocalDate startDate, LocalDate endDate, String dateType, Long siteId);

    public Map<String, Long> getAgeStats(LocalDate startDate, LocalDate endDate, String dateType, Long siteId);

    public Map<String, Long> getLocalStats(LocalDate startDate, LocalDate endDate, String dateType, Long siteId);

    public Map<String, Object> getAllCustomerStats(LocalDate startDate, LocalDate endDate, String dateType, Long siteId);


}
