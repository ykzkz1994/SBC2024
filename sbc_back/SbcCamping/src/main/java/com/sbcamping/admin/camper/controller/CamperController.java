package com.sbcamping.admin.camper.controller;

import com.sbcamping.admin.camper.dto.CamperDTO;
import com.sbcamping.admin.camper.service.CamperService;
import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.admin.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/admin/campers")
public class CamperController {
    private final CamperService camperService;
    private final CustomFileUtil fileUtil;

    // 게시글 목록 : 구현 실패
    @GetMapping("/list")
    public PageResponseDTO<CamperDTO> list(PageRequestDTO pageRequestDTO) {
        log.info(pageRequestDTO);
        return camperService.list(pageRequestDTO);
    }

    // 게시글 등록 : 알 수 없음 ㅋ
    @PostMapping("/")
    public Map<String, String> register(CamperDTO camperDTO) {
        log.info("register : " + camperDTO);

        // 파일 첨부
        List<MultipartFile> files = camperDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        camperDTO.setUploadFileNames(uploadFileNames);
        log.info(uploadFileNames);

        return Map.of("RESULT", "SUCCESS");
    }
    // 게시글 상세 : 구현 성공
    @GetMapping("/{cBoardID}")
    public CamperDTO read(@PathVariable(name="cBoardID") Long cBoardID) {
        return camperService.get(cBoardID);
    }

    // 게시글 수정 : 알 수 없음 ㅋ
    @PutMapping("/{cBoardID}")
    public Map<String, String> modify(@PathVariable(name="cBoardID") Long cBoardID, @RequestBody CamperDTO camperDTO) {
        camperDTO.setCBoardID(cBoardID);

        camperService.modify(camperDTO);

        return Map.of("RESULT", "SUCCESS");
    }
    // 게시글 삭제 : 구현 성공
    @DeleteMapping("/{cBoardID}")
    public Map<String, String> remove(@PathVariable(name="cBoardID") Long cBoardID) {
        camperService.remove(cBoardID);

        return Map.of("RESULT", "SUCCESS");
    }

    // 게시글 검색

    // 업로드된 파일 보기
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    // 댓글 목록
    // 댓글 등록
    // 댓글 수정
    // 댓글 삭제
}
