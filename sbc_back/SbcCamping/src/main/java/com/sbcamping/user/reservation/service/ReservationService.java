package com.sbcamping.user.reservation.service;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Site;

import java.util.List;

public interface ReservationService {

    void register(Reservation reservation);
    Reservation get(String RES_ID);
    List<Site> getSite();
    List<Member> getMember();


}
