package com.sbcamping.admin.qna.controller;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.qna.dto.QnaCommentDTO;
import com.sbcamping.admin.qna.dto.QnaDTO;
import com.sbcamping.admin.qna.service.QnaService;
import com.sbcamping.admin.util.CustomFileUtil;
import com.sbcamping.domain.QuestionBoardComment;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/qnas")
public class QnaController {

    @Autowired
    private final QnaService qnaService;

    private final CustomFileUtil fileUtil;

    // 1. 목록(list)
    @GetMapping("/list")
    public PageResponseDTO<QnaDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list.............." + pageRequestDTO);
        return qnaService.getList(pageRequestDTO);
    }

    // 2. 등록 : ROLE에 따라서 게시글 또는 자주하는 질문으로 뷰에서 표시됨 -> Question_Board 공지여부 컬럼(Qboard_notice)
    @PostMapping("/")
    public Map<String, Long> register(QnaDTO qnaDTO) {
        log.info("register............." + qnaDTO);
        MultipartFile file = qnaDTO.getFile();
        String uploadFileName = fileUtil.saveFile(file);
        qnaDTO.setQBoardAttachment(uploadFileName);
        log.info(uploadFileName);

        Long qbId = qnaService.register(qnaDTO);
        return Map.of("RESULT", qbId);
    }

    // 3. 상세
    @GetMapping("/{qbID}")
    public QnaDTO read(@PathVariable("qbID") Long qbID) {
        return qnaService.get(qbID); }

    // 4. 수정 (Update)
    @PutMapping("/{qbID}")
    public Map<String, String> modify(@PathVariable("qbID") Long qbID, QnaDTO qnaDTO) {
        qnaDTO.setQBoardID(qbID);
        QnaDTO oldQnaDTO = qnaService.get(qbID);

        if (qnaDTO.getFile() != null) {
            // 새로 업로드 할 파일
            MultipartFile newFile = qnaDTO.getFile();
            log.info("modify.............." + newFile.getOriginalFilename());

            // 새로 업로드되어서 만들어진 파일 이름
            String newUploadedFileName = fileUtil.saveFile(newFile);
            qnaDTO.setQBoardAttachment(newUploadedFileName);
            log.info("modify.............." + qnaDTO.getQBoardAttachment());

            // 기존 파일
            String oldUploadedFileName = oldQnaDTO.getQBoardAttachment();
            log.info("modify.............." + oldQnaDTO);

            // 실제 파일 삭제
            if (oldUploadedFileName != null) {
                fileUtil.deleteFile(oldUploadedFileName);
                log.info("삭제완료");
            }
        } else {
            qnaDTO.setQBoardAttachment(oldQnaDTO.getQBoardAttachment());
        }

        // 수정
        qnaService.modify(qnaDTO);

        return Map.of("RESULT", "SUCCESS");
    }

    // 5. 삭제 (Delete)
    @DeleteMapping("/{qbID}")
    public Map<String, String> remove(@PathVariable("qbID") Long qbID) {
        String oldFileName = qnaService.get(qbID).getQBoardAttachment();

        qnaService.remove(qbID);
        fileUtil.deleteFile(oldFileName);

        return Map.of("RESULT", "SUCCESS");
    }

    // 6. 검색
    @GetMapping("/search")
    public PageResponseDTO<QnaDTO> searchQna(PageRequestDTO pageRequestDTO,
                                             @RequestParam(defaultValue = "title", required = false) String type,
                                             @RequestParam(required = false) String keyword) {
        log.info("search result list..... : "+pageRequestDTO);
        return qnaService.searchQboard(pageRequestDTO, type, keyword);  // 기본 정렬 : qBoardID 내림차순

    }

    // 1. 댓글 등록 : ROLE에 따라서  -> Question_Board 관리자 답변 상태 컬럼(Qboard_asked)
    @PostMapping("/comments/")
    public Map<String, Long> register(QnaCommentDTO qnaCommentDTO) {

        Long qbcommentID = qnaService.registerComment(qnaCommentDTO);
        return Map.of("RESULT", qbcommentID);
    }

    // 2. 댓글 수정
    @PutMapping("/comments/{qbcommentID}")
    public Map<String, String> modify(@PathVariable("qbcommentID") Long qbcommentID, QnaCommentDTO qnaCommentDTO) {
        qnaCommentDTO.setQCommentID(qbcommentID);

        // 수정
        qnaService.modifyComment(qnaCommentDTO);

        return Map.of("RESULT", "SUCCESS");
    }

    // 3. 댓글 목록
    @GetMapping("/comments/list")
    public List<QnaCommentDTO> commentList() {
        return qnaService.commentlist();
    }

    // 4. 댓글 삭제
   @DeleteMapping("/comments/{qbcommentID}")
   public Map<String, String> removeComment(@PathVariable("qbcommentID") Long qbcommentID) {

       qnaService.removeComment(qbcommentID);

       return Map.of("RESULT", "SUCCESS");
   }

}
