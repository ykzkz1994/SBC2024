package com.sbcamping.admin.qna.service;

import com.sbcamping.admin.member.repository.AdminMemberRepository;
import com.sbcamping.admin.qna.repository.QnaCommentRepository;
import com.sbcamping.admin.qna.repository.QnaRepository;
import com.sbcamping.domain.Member;
import com.sbcamping.domain.QuestionBoard;
import com.sbcamping.domain.QuestionBoardComment;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.Optional;

@SpringBootTest
@Log4j2
public class ServiceTest {

    @Autowired
    QnaRepository qnaRepository;
    @Autowired
    AdminMemberRepository adminMemberRepository;

    @Autowired
    QnaCommentRepository qnaCommentRepository;


    @Test
    void testInsert() {
        Optional<Member> memberOptional = adminMemberRepository.findById(61L);
        Member selectedMember = memberOptional.get();

        Optional<QuestionBoard> qbOptional = qnaRepository.findById(43L);
        QuestionBoard qb = qbOptional.get();

        QuestionBoardComment qbcomm = QuestionBoardComment.builder().qBoard(qb).qBoardIsAdmin('N').qCommentDate(new Date("2024/07/07")).qCommentContent("댓글 테스트")
                .build();

        qnaCommentRepository.save(qbcomm);


        log.info(qbcomm.toString() + "등록완료!");
    }
}
