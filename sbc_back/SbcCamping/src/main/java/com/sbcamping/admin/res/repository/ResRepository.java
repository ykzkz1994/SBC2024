package com.sbcamping.admin.res.repository;

import com.sbcamping.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResRepository extends JpaRepository<Reservation,String> {

}
