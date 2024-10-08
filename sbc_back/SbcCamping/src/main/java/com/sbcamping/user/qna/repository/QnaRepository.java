package com.sbcamping.user.qna.repository;

import com.sbcamping.domain.QuestionBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaRepository extends JpaRepository<QuestionBoard, Long> {

    //특정 회원의 문
}
