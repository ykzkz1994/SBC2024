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

    private Long resId; //예약 번호
    private MemberDTO memberId; //회원 번호
    private SiteDTO siteId; //구역번호
    private String userName;   //예약자 명
    private String userPhone;   //예약자 전화번호
    private int resPeople;   //입실입원수
    private Date checkinDate;    //입실 날짜
    private Date checkoutDate;  //퇴실 날짜
    private Date resDate;   //예약을 체결날짜
    private Date resStatus; //예약상태
    private int totalPay;   //총 결제 금액
    private Date cancelDate;    //취소날짜
    private String cancelReason;    //취소사유
    private String review;  //리뷰 작성 여부 (1예약 =1리뷰 원칙을 위해 생선)


}
