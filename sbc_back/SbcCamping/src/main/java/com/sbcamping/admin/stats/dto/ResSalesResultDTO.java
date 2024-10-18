package com.sbcamping.admin.stats.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResSalesResultDTO {

    private String resDate;             // 예약 날짜
    private LocalDate checkinDate;      // 체크인 날짜
    private double scheduledAmount;      // 이용예정 금액
    private int scheduledCount;          // 이용예정 건수
    private double completedAmount;      // 이용완료 금액
    private int completedCount;          // 이용완료 건수

    private Long siteID;
    private String siteName;

    public ResSalesResultDTO(LocalDate date) {
        this.resDate = date.toString();
    }
}
