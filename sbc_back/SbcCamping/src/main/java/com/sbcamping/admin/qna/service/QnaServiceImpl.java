package com.sbcamping.admin.qna.service;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.admin.qna.dto.QnaCommentDTO;
import com.sbcamping.admin.qna.dto.QnaDTO;
import com.sbcamping.admin.qna.repository.QnaCommentRepository;
import com.sbcamping.admin.qna.repository.QnaRepository;
import com.sbcamping.domain.Member;
import com.sbcamping.domain.QuestionBoard;
import com.sbcamping.domain.QuestionBoardComment;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class QnaServiceImpl implements QnaService {

    // 자동 주입 대상은 final로!
    @Autowired
    private final ModelMapper modelMapper;

    @Autowired
    private final QnaRepository qnaRepository;

    @Autowired
    private final QnaCommentRepository qnaCommentRepository;

    // 1. 목록 (List)
    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<QnaDTO> getList(PageRequestDTO requestDTO) {
        log.info("getList");

        Pageable pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by("qBoardID").descending());
        Page<QuestionBoard> qnas = qnaRepository.orderdList(pageable);

        long totalCount = qnas.getTotalElements();

        List<QnaDTO> dtoList = qnas.getContent().stream().map(qna -> modelMapper.map(qna, QnaDTO.class)).collect(Collectors.toList());

        return PageResponseDTO.<QnaDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(requestDTO)
                .build();
    }

    // 2. 등록 (Register)
    @Override
    public Long register(QnaDTO qnaDTO) {
        Member member = qnaDTO.getMember();
        String memberRole = member.getMemberRole();

        // 관리자가 작성할 경우 공지여부 'Y' 로 변경
        if (memberRole.equals("ROLE_ADMIN")) {
            qnaDTO.setQBoardNotice('Y');
            qnaDTO.setQBoardTitle("[자주하는 질문] "+qnaDTO.getQBoardTitle());
        } else {
            qnaDTO.setQBoardNotice('N');
            qnaDTO.setQBoardTitle(qnaDTO.getQBoardTitle());
        }

        QuestionBoard qb = modelMapper.map(qnaDTO, QuestionBoard.class);
        QuestionBoard result = qnaRepository.save(qb);

        return result.getQBoardID();
    }

    // 3. 상세 (Read), 조회수 변경
    @Override
    public QnaDTO get(Long qbID) {
        Optional<QuestionBoard> result = qnaRepository.findById(qbID);
        QuestionBoard qb = null;

        if (result.isPresent()) {
            qb = result.orElseThrow();
            qb.changeViews(qb.getQBoardViews()+1);
            this.qnaRepository.save(qb);
        }

        QnaDTO dto = modelMapper.map(qb, QnaDTO.class);
        return dto;
    }

    // 4. 수정 (Update)
    @Override
    public void modify(QnaDTO qnaDTO) {
        // 1. read
        Optional<QuestionBoard> result = qnaRepository.findById(qnaDTO.getQBoardID());
        QuestionBoard qb = result.orElseThrow();

        // 2. change : title, content, file
        String updatedTitle = qnaDTO.getQBoardTitle();
        String updatedContent = qnaDTO.getQBoardContent();
        String updatedAttachment = qnaDTO.getQBoardAttachment();

        if (updatedTitle != null) { qb.changeTitle(updatedTitle); } else { qb.changeTitle(qb.getQBoardTitle()); }
        if (updatedContent != null) {qb.changeContent(updatedContent); } else { qb.changeContent(qb.getQBoardContent()); }
        if (updatedAttachment != null) {qb.changeAttachment(updatedAttachment); } else { qb.changeAttachment(qb.getQBoardAttachment()); }

        qnaRepository.save(qb);
    }

    // 5. 삭제 (Delete)
    @Override
    public void remove(Long qbID) {
        qnaRepository.deleteById(qbID);
    }

    // 6. 검색 (Search) : type (title, content 일부분 검색), keyword가 null인 경우 전체리스트 반환
    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<QnaDTO> searchQboard(PageRequestDTO requestDTO, String type, String keyword) {
        Pageable pageable = null;
        Page<QuestionBoard> searchQbs = null;

        if (keyword != null) {
            pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by("qBoardID").descending());

            searchQbs = switch (type) {
                case "title" -> qnaRepository.findByqBoardTitleContaining(keyword, pageable);
                case "content" -> qnaRepository.findByqBoardContentContaining(keyword, pageable);
                default -> null;
            };

        } else {
            pageable = PageRequest.of(requestDTO.getPage()-1, requestDTO.getSize(), Sort.by("qBoardID").descending());
            searchQbs = qnaRepository.orderdList(pageable);
        }

        long totalCount = searchQbs.getTotalElements();

        List<QnaDTO> dtoList = searchQbs.getContent().stream().map(qna -> modelMapper.map(qna, QnaDTO.class)).collect(Collectors.toList());

        return PageResponseDTO.<QnaDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(requestDTO)
                .build();

    }

    // 7. 댓글 등록 : ROLE에 따라서  -> Question_Board 관리자 답변 상태 컬럼(Qboard_asked)
    @Override
    public Long registerComment(QnaCommentDTO qnaCommentDTO) {
        Member member = qnaCommentDTO.getMember();
        String memberRole = member.getMemberRole();

        QuestionBoard qb = qnaCommentDTO.getQBoard();

        // 관리자가 작성할 경우 관리자 답변 여부 'Y' 로 변경, 해당 게시글 관리자 답변 여부 'Y'로 변경
        if (memberRole.equals("ROLE_ADMIN")) {
            qnaCommentDTO.setQBoardIsAdmin('Y');
            qb.changeAsked('Y');
            qnaRepository.save(qb);   // 이렇게 바로 저장해도 되는건가?!
        } else {
            qnaCommentDTO.setQBoardIsAdmin('N');
        }

        QuestionBoardComment qbcomm = modelMapper.map(qnaCommentDTO, QuestionBoardComment.class);
        QuestionBoardComment result = qnaCommentRepository.save(qbcomm);

        return result.getQCommentID();
    }

    // 8. 댓글 수정
    @Override
    public void modifyComment(QnaCommentDTO qnaCommentDTO) {
        // 1. read
        Optional<QuestionBoardComment> result = qnaCommentRepository.findById(qnaCommentDTO.getQCommentID());
        QuestionBoardComment qbcomm = result.orElseThrow();

        // 2. change : content, Date
        String updatedContent = qnaCommentDTO.getQCommentContent();
        if (updatedContent != null) {qbcomm.changeContent(updatedContent); } else { qbcomm.changeContent(qbcomm.getQCommentContent()); }

        Date updatedDate = new Date();
        qnaCommentDTO.setQCommentDate(updatedDate);

        qnaCommentRepository.save(qbcomm);
    }

    // 9. 댓글 목록 : 페이징 처리 없음
    @Override
    public List<QnaCommentDTO> commentlist(Long qbID) {
        List<QuestionBoardComment> getList = qnaCommentRepository.orderedList(qbID);
        List<QnaCommentDTO> result = getList.stream().map(qnaComm -> modelMapper.map(qnaComm, QnaCommentDTO.class)).collect(Collectors.toList());
        return result;
    }

    // 10. 댓글 삭제
    @Override
    public void removeComment(Long qbcommID) {
        qnaRepository.deleteById(qbcommID);
    }

    // 11. 댓글 수 (Count)

//    @Override
//    public Long countByQBoardID(Long qboardID) {
//        return qnaCommentRepository.countByQboardID(qboardID);
//    }
}
