package com.sbcamping.admin.camper.repository;

import com.sbcamping.domain.CamperBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CamperRepository extends JpaRepository<CamperBoard, Long> {

    @Query("select c, m.memberName from CamperBoard c join c.member m")
    Optional<CamperBoard> selectOne(@Param("cBoardID") Long cbno);

}
