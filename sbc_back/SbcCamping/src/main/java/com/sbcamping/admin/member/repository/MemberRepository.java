package com.sbcamping.admin.member.repository;

import com.sbcamping.domain.CamperBoard;
import com.sbcamping.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
