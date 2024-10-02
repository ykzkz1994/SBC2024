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

    @Test
    void memberInsert() {
        Member member = Member.builder().memberGender('F').memberEmail("drvan@ac.kr").memberRegDate(new Date()).memberStatus("ON").memberPw("1234").memberRole("ROLE_ADMIN").memberPhone("01088889999").memberLocal("인천").memberName("아나콘다").memberBirth("19880101")
                .build();

        memberRepository.save(member);
    }

//       @Commit
//       @Transactional
//       public void testDelete() {
//           Long qbno = 2L;
//           qnaRepository.deleteById(qbno);
//       }

//       @Test
//        void testInsert() {
//           Optional<Member> memberOptional = memberRepository.findById(61L);
//           Member selectedMember = memberOptional.get();
//
//            QuestionBoard qb = QuestionBoard.builder().qBoardTitle("자주하는 질문 1").qBoardContent("테스트중1").qBoardViews(8L).qBoardNotice('Y').member(selectedMember).qBoardDate(new Date()).qBoardAsked('N')
//                    .qBoardAttachment(UUID.randomUUID().toString()+"-"+"apple.jpg").build();
//
//           qnaRepository.save(qb);
//
//
//            log.info(qb.toString() + "등록완료!");
//        }

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
