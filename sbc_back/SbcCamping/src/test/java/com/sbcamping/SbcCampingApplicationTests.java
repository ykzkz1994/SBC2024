package com.sbcamping;

import com.sbcamping.admin.member.repository.MemberRepository;
import com.sbcamping.admin.qna.repository.QnaRepository;
import com.sbcamping.domain.Member;
import com.sbcamping.domain.QuestionBoard;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@SpringBootTest
class SbcCampingApplicationTests {

    @Autowired
    QnaRepository qnaRepository;
    @Autowired
    MemberRepository memberRepository;






//       @Commit
//       @Transactional
//       public void testDelete() {
//           Long qbno = 2L;
//           qnaRepository.deleteById(qbno);
//       }

       @Test
        void testInsert() {
           Optional<Member> memberOptional = memberRepository.findById(62L);
           Member selectedMember = memberOptional.get();

            QuestionBoard qb = QuestionBoard.builder().qBoardTitle("자주하는 질문 1").qBoardContent("테스트중1").qBoardViews(8L).qBoardNotice('Y').member(selectedMember).qBoardDate(new Date()).qBoardAsked('N')
                    .qBoardAttachment(UUID.randomUUID().toString()+"-"+"default.jpg").build();

           QuestionBoard qb2 = QuestionBoard.builder().qBoardTitle("자주하는 질문 2").qBoardContent("테스트중2").qBoardViews(8L).qBoardNotice('Y').member(selectedMember).qBoardDate(new Date()).qBoardAsked('N')
                   .qBoardAttachment(UUID.randomUUID().toString()+"-"+"default.jpg").build();

           QuestionBoard qb3 = QuestionBoard.builder().qBoardTitle("자주하는 질문 3").qBoardContent("테스트중3").qBoardViews(8L).qBoardNotice('Y').member(selectedMember).qBoardDate(new Date()).qBoardAsked('N')
                   .qBoardAttachment(UUID.randomUUID().toString()+"-"+"default.jpg").build();


           qnaRepository.save(qb);
           qnaRepository.save(qb2);
           qnaRepository.save(qb3);

            log.info(qb.toString() + "등록완료!");
        }

//    @Test
//    public void testUpdate() {
//        Long qbno = 5L;
//
//        Optional<QuestionBoard> optionalQuestionBoard = qnaRepository.findById(qbno);
//        QuestionBoard qb = optionalQuestionBoard.get();
//
//        qb.changeTitle("수정 테스트 중");
//        qb.changeContent("와우 진짜 수정 됨 짱 신기 ");
//        qb.changeAttachment("수정.jpg");
//
//        qnaRepository.save(qb);
//    }
}
