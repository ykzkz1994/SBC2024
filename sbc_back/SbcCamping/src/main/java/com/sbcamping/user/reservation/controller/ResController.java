package com.sbcamping.user.reservation.controller;

import com.sbcamping.domain.Member;
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Site;
import com.sbcamping.user.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("userResController")    //사용자 예약 컨트롤러
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/res")
public class ResController {

    private final ReservationService service;

    @PreAuthorize("ROLE_USER")
    @PostMapping("/")
    public String register(@RequestBody Reservation reservation) {

        service.register(reservation);

        return reservation.getResId();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/siteList")
    public List<Site> getSite() {

        return service.getSite();
    }

    @PreAuthorize("ROLE_USER")
    @GetMapping("/memberList")
    public List<Member> getMember() {

        return service.getMember();
    }

}
