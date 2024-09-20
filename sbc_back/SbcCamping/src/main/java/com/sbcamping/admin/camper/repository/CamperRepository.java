package com.sbcamping.admin.camper.repository;

import com.sbcamping.domain.CamperBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CamperRepository extends JpaRepository<CamperBoard, Long> {
}
