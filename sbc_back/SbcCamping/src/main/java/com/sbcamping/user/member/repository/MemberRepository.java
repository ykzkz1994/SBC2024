package com.sbcamping.user.member.repository;

import com.sbcamping.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByMemberEmail(String email);

    Integer countByMemberEmail(String memberEmail);
}
