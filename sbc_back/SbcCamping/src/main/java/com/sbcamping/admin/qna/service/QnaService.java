package com.sbcamping.admin.qna.service;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.admin.qna.dto.QnaDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface QnaService {

    // 1. 목록 (List)
    PageResponseDTO<QnaDTO> getList(PageRequestDTO requestDTO);

    // 3. 상세 (Read)
    QnaDTO get(Long qbID);

    // 4. 수정 (Update)
    void modify(QnaDTO qnaDTO);

    // 6. 검색 (Search) : type (title, content 일부분 검색), keyword가 null인 경우 전체리스트 반환
    PageResponseDTO<QnaDTO> searchQboard(PageRequestDTO requestDTO, String type, String keyword);
}
