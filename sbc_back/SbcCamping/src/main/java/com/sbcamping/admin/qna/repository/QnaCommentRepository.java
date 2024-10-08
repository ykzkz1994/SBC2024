package com.sbcamping.admin.qna.repository;

import com.sbcamping.domain.QuestionBoard;
import com.sbcamping.domain.QuestionBoardComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QnaCommentRepository extends JpaRepository<QuestionBoardComment, Long> {

    // 댓글 정렬 기준 : 등록 날짜(qCommentDate) 오름차순
    @Query("select q from QuestionBoardComment q order by q.qCommentDate asc")
    List<QuestionBoardComment> orderedList();

    // 댓글 갯수 카운트
//    @Query("SELECT COUNT(c) FROM QuestionBoardComment c WHERE c.qBoard.qBoardID = :qBoardID")
//    Long countByQboardID(@Param("qboardID")Long qBoardID);

}
