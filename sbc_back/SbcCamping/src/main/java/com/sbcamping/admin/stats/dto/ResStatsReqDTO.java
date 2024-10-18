package com.sbcamping.admin.stats.dto;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Site;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResStatsReqDTO {

    private String resId; // 예약 번호

    private Date checkinDate; // 입실 날짜

    private String resDate;// 예약 날짜

    private String resStatus; // 예약 상태

    private Long resTotalPay; // 결제금액

    private String resCancelDate; // 취소날짜

    private String resCancelReason; // 취소사유

    private Long memberID;

    private Long siteID;

    private String siteName;

}
