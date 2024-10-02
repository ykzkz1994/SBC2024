package com.sbcamping.admin.qna.service;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.admin.qna.dto.QnaDTO;
import com.sbcamping.admin.qna.repository.QnaRepository;
import com.sbcamping.domain.Member;
import com.sbcamping.domain.QuestionBoard;
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

        QuestionBoard qb = modelMapper.map(qnaDTO, QuestionBoard.class);
        QuestionBoard result = qnaRepository.save(qb);

        return result.getQBoardID();
    }

    // 3. 상세 (Read)
    @Override
    public QnaDTO get(Long qbID) {
        Optional<QuestionBoard> result = qnaRepository.findById(qbID);
        QuestionBoard qb = result.orElseThrow();
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
}
