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
public class CustomerStatsReqDTO {
    private Long memberID; // 회원 번호

    private String memberEmail; // 회원 이메일

    private String memberName; // 회원 명

    private String memberGender; // 회원 성별

    private String memberBirth; // 회원 생년월일

    private String memberLocal; // 회원 지역

    private String resId; // 예약 번호
    private Long siteId;  // 구역 번호

    private LocalDate date;
    private int totalReviews;
    private int cleanCount;
    private int priceCount;
    private int facilityCount;
    private int photoCount;
    private int silenceCount;
    private int kindCount;
    private int viewCount;

    public CustomerStatsReqDTO(LocalDate date) {
        this.date = date;
    }

    public void incrementTotalReviews() {
        this.totalReviews++;
    }

    public void incrementCleanCount() {
        this.cleanCount++;
    }

    public void incrementPriceCount() {
        this.priceCount++;
    }

    public void incrementFacilityCount() {
        this.facilityCount++;
    }

    public void incrementPhotoCount() {
        this.photoCount++;
    }

    public void incrementSilenceCount() {
        this.silenceCount++;
    }

    public void incrementKindCount() {
        this.kindCount++;
    }

    public void incrementViewCount() {
        this.viewCount++;
    }

}
