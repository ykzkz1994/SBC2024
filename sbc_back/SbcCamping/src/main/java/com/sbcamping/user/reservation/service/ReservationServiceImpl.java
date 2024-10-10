package com.sbcamping.user.reservation.service;

import com.sbcamping.admin.site.repository.SiteRepository;
import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Site;
import com.sbcamping.user.member.repository.MemberRepository;
import com.sbcamping.user.reservation.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    SiteRepository siteRepository;

    @Autowired
    MemberRepository memberRepository;

    private static int number = 1;

    @Override
    public void register(Reservation reservation) {
        // 예약번호를 생성해서 만들어야되는데 어케하지? 날짜+01 .. 02 .. 03
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        String formattedDate = date.format(formatter);

        String formattedNumber = String.format("%02d", number);
        number++;

        String resId = formattedDate + formattedNumber;

        reservation.setResId(resId);

        log.info("---------------------------------------------");
        log.info(reservation);

        reservationRepository.save(reservation);

    }

    @Override
    public Reservation get(String RES_ID) {

        Optional<Reservation> result = reservationRepository.findById(Long.valueOf(RES_ID));

        return result.orElseThrow();
    }

    @Override
    public List<Site> getSite() {

        return siteRepository.findAll();
    }

    @Override
    public List<Member> getMember() {

        return memberRepository.findAll();
    }

}
