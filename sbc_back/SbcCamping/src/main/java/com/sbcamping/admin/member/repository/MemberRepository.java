package com.sbcamping.admin.member.repository;

import com.sbcamping.domain.CamperBoard;
import com.sbcamping.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 휴면회원 리스트
    @Query("select m from Member m where m.memberStatus='OFF'")
    Page<Member> selectInactive(Pageable pageable);
}
