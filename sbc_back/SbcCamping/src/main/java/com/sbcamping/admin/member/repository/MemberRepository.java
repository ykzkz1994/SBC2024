package com.sbcamping.admin.member.repository;

import com.sbcamping.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
