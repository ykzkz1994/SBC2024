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
public class ResCancelResultDTO {
    private String resCancelDate;
    private int cancelCount;
    private double cancelAmount;

    public ResCancelResultDTO(LocalDate date) {
        this.resCancelDate = date.toString();
        this.cancelCount = 0;
        this.cancelAmount = 0;
    }

}
