package com.sbcamping.admin.stats.repository;

import com.sbcamping.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatsRepository extends JpaRepository<Reservation, Long> {

}
