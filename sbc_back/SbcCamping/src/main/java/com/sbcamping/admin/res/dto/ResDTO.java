package com.sbcamping.admin.res.dto;

import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.admin.site.dto.SiteDTO;
import com.sbcamping.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data //Getter,Setter,equals,hashCode,toString자동 생성
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResDTO {

    private String resId; // 예약 번호
    private MemberDTO member; // 회원 정보
    private SiteDTO site; // 구역 정보
    private String resUserName;   // 예약자 명
    private String resUserPhone;   // 예약자 전화번호
    private Long resPeople;   // 입실 인원수
    private Date checkinDate;    // 입실 날짜
    private Date checkoutDate;  // 퇴실 날짜
    private String resDate;   // 예약 날짜
    private String resStatus; // 예약 상태
    private Long resTotalPay;   // 총 결제 금액
    private Date resCancelDate;    // 취소 날짜
    private String resCancelReason;    // 취소 사유
    private char resReview;  // 리뷰 작성 여부

}
