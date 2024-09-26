package com.sbcamping.admin.qna.repository;

import com.sbcamping.domain.QuestionBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaRepository extends JpaRepository<QuestionBoard, Long> {
}
