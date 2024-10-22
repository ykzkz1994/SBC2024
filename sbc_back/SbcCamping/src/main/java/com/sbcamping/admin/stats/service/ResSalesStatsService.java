package com.sbcamping.admin.stats.service;

import com.sbcamping.admin.stats.dto.CustomerStatsReqDTO;
import com.sbcamping.admin.stats.dto.ResStatsReqDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


public interface ResSalesStatsService {

    // 1-1 매출 현황 : 금액 가져오기, 예약 건수
    public Map<String, Object> sales(LocalDate startDate, LocalDate endDate, Long siteId, String dateType);

    // 1-2 예약률 현황
    public List<ResStatsReqDTO> rate(LocalDate startDate, LocalDate endDate, Long siteID);

    // 1-3 예약 취소 현황 : 예약 상태, (취소 건수, 취소 금액)
    public Map<String, Object> cancel(LocalDate startDate, LocalDate endDate, Long siteId, String dateType);

}
