package com.sbcamping.user.reservation.service;

import com.sbcamping.admin.site.repository.SiteRepository;
import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Site;
import com.sbcamping.user.member.repository.MemberRepository;
import com.sbcamping.user.reservation.dto.ReservationDTO;
import com.sbcamping.user.reservation.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
@EnableScheduling // 스케줄링 활성화
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    SiteRepository siteRepository;

    @Autowired
    MemberRepository memberRepository;

    private static int number = 1;

    @Override
    public Reservation register(ReservationDTO reservationDTO) {
        if (reservationDTO.getMember() == null || reservationDTO.getSite() == null) {
            throw new IllegalArgumentException("Member ID and Site ID must not be null");
        }

        Long memberId = reservationDTO.getMember().getMemberId();
        Long siteId = reservationDTO.getSite().getSiteId();

        log.info("MemberId: ", memberId);
        log.info("SiteId: ", siteId);

        // 예약번호를 생성해서 만들어야되는데 어케하지? 날짜+01 .. 02 .. 03
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        String formattedDate = date.format(formatter);

        String formattedNumber = String.format("%02d", number);
        number++;

        String resId = formattedDate + formattedNumber;

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> new IllegalArgumentException("Site not found"));

        log.info("--------------------------------------------------------------------");
        log.info(member);
        log.info("--------------------------------------------------------------------");
        log.info(site);

        Reservation reservation = Reservation.builder()
                .resId(resId)
                .resUserName(reservationDTO.getResUserName())
                .resUserPhone(reservationDTO.getResUserPhone())
                .resPeople(reservationDTO.getResPeople())
                .checkinDate(reservationDTO.getCheckinDate())
                .checkoutDate(reservationDTO.getCheckoutDate())
                .resTotalPay(reservationDTO.getResTotalPay())
                .resDate(LocalDate.now())
                .member(member)
                .site(site)
                .build();


        reservationRepository.save(reservation);

        return reservation;
    }

    @Override
    public List<Site> getSite() {

        return siteRepository.findAll();
    }

    @Override
    public List<Member> getMember() {

        return memberRepository.findAll();
    }

    @Override
    public List<Object[]> getResCheck() {

        return reservationRepository.getReservations();
    }

    @Override
    @Scheduled(cron = "0 0 */6 * * ?") // 1시간마다 함수 호출
    public void resStatusCheck() {

        // 현재 날짜 구하기
        LocalDate now = LocalDate.now();

        // RES_STATUS가 예약완료인 예약들 가져오기
        List<Reservation> reservations = reservationRepository.findByResStatus("예약완료");

        reservations.forEach(reservation ->  {
            // checkout_Date가 하루 지났는지 확인
            if (reservation.getCheckoutDate().isBefore(now.minusDays(1))) {
                // RES_STATUS를 사용완료로 변경
                reservation.setResStatus("사용완료");
                reservationRepository.save(reservation);
                log.info("예약 ID {} 상태가 '사용완료'로 변경되었습니다", reservation.getResId());
            }
        });
    }
}
