package com.sbcamping.user.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

    private String resId;
    private String resUserName;
    private String resUserPhone;
    private Long resPeople;
    private String resCancelReason;

}
