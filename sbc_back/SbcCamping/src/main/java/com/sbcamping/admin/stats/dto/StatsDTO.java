package com.sbcamping.admin.stats.dto;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Site;
import jakarta.persistence.*;
import lombok.Builder;

import java.util.Date;

public class StatsDTO {

    private String resId; // 예약 번호

    private String resUserName; // 예약자 명

    private String resUserPhone; // 예약자 핸드폰 번호

    private Long resPeople; // 인원수

    private Date checkinDate; // 입실 날짜

    private Date checkoutDate; // 퇴실 날짜

    private String resDate;// 예약 날짜

    private String resStatus; // 예약 상태

    private Long resTotalPay; // 결제금액

    private String resCancelDate; // 취소날짜

    private String resCancelReason; // 취소사유

    private char resReview; // 리뷰 작성 여부

    private Member member;      // member ID

    private Site site;          // site ID


}
