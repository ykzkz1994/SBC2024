package com.sbcamping.admin.stats.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewStatsDTO {
    private LocalDate date;
    private int totalReviews;
    private int cleanCount;
    private int priceCount;
    private int facilityCount;
    private int photoCount;
    private int silenceCount;
    private int kindCount;
    private int viewCount;

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
