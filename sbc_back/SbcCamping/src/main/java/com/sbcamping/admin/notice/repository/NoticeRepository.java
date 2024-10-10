package com.sbcamping.admin.notice.repository;

import com.sbcamping.domain.NoticeBoard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeBoard,Long> {

}
