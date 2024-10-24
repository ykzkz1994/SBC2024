package com.sbcamping.admin.stats.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResSalesResultDTO {

    private String resDate;             // 예약 날짜
    private LocalDate checkinDate;
    private double scheduledAmount;
    private int scheduledCount;
    private double completedAmount;
    private int completedCount;
    private Long siteID;

    private Map<Long, SiteSalesInfo> siteSalesMap = new HashMap<>();

    public void addScheduledSale(Long siteId, double amount) {
        scheduledCount++;
        scheduledAmount += amount;
        addSiteSale(siteId, amount, true);
    }

    public void addCompletedSale(Long siteId, double amount) {
        completedCount++;
        completedAmount += amount;
        addSiteSale(siteId, amount, false);
    }

    public void addSiteSale(Long siteId, double amount, boolean isScheduled) {
        SiteSalesInfo siteSalesInfo = siteSalesMap.getOrDefault(siteId, new SiteSalesInfo());
        siteSalesInfo.addSales(amount);
        siteSalesMap.put(siteId, siteSalesInfo);
    }

    public ResSalesResultDTO(LocalDate date) {
        this.resDate = date.toString();
    }
}
