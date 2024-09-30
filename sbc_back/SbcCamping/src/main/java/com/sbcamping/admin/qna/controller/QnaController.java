package com.sbcamping.admin.qna.controller;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.member.dto.MemberDTO;
import com.sbcamping.admin.qna.dto.QnaDTO;
import com.sbcamping.admin.qna.service.QnaService;
import com.sbcamping.admin.util.CustomFileUtil;
import com.sbcamping.domain.QuestionBoard;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    //@PostMapping("/")

    // 3. 상세
    @GetMapping("/{qbID}")
    public QnaDTO read(@PathVariable("qbID") Long qbID) {
        return qnaService.get(qbID); }

    // 4. 수정 (Update)
    @PutMapping("/{qbID}")
    public Map<String, String> modify(@PathVariable("qbID") Long qbID, QnaDTO qnaDTO) {
        qnaDTO.setQBoardID(qbID);
        QnaDTO oldQnaDTO = qnaService.get(qbID);

        // 화면에서 변화없이 계속 유지된 파일(기존 파일)
        String oldUploadedFileName = oldQnaDTO.getQBoardAttachment();

        // 새로 업로드 할 파일
        MultipartFile newFile = qnaDTO.getFile();

        // 새로 업로드되어서 만들어진 파일 이름
        String newUploadedFileName = fileUtil.saveFile(newFile);
        qnaDTO.setQBoardAttachment(newUploadedFileName);

        // 수정
        qnaService.modify(qnaDTO);

        // 실제 파일 삭제
        if (oldUploadedFileName != null) {
            fileUtil.deleteFile(oldUploadedFileName);
        }

        return Map.of("RESULT", "SUCCESS");
    }

    // 5. 삭제 (Delete)
    // @DeleteMapping("/{qbID}")

    // 6. 검색
    @GetMapping("/search")
    public PageResponseDTO<QnaDTO> searchQna(PageRequestDTO pageRequestDTO,
                                             @RequestParam(defaultValue = "title", required = false) String type,
                                             @RequestParam(required = false) String keyword) {
        log.info("search result list..... : "+pageRequestDTO);
        return qnaService.searchQboard(pageRequestDTO, type, keyword);  // 기본 정렬 : qBoardID 내림차순

    }
    // 1. 댓글 등록 : ROLE에 따라서  -> Question_Board 관리자 답변 상태 컬럼(Qboard_asked)
    //@PostMapping("/comments/")

    // 2. 댓글 수정
    // @PutMapping("/comments/{qbcommentID}")

    // 3. 댓글 목록
    // @GetMapping("/comments/list")

    // 4. 댓글 삭제
   // @DeleteMapping("/comments/{qbcommentID}")

//    // 파일첨부 테스트
//    @PostMapping("/")
//    public Map<String, String> registerPhoto(QnaDTO qnaDTO) {
//        log.info("register photo : " + qnaDTO);
//        MultipartFile file = qnaDTO.getFile();
//        String uploadFileName = fileUtil.saveFile(file);
//        qnaDTO.setQBoardAttachment(uploadFileName);
//        log.info(uploadFileName);
//
//        return Map.of("RESULT", "SUCCESS");
//
//
//
//    }
//
//    // 파일 보기 테스트
//    @GetMapping("/view/{fileName}")
//    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
//        return fileUtil.getFile(fileName);
//    }
}
