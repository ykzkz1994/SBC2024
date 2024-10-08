package com.sbcamping.user.camper.controller;

import com.sbcamping.domain.CamperBoard;
import com.sbcamping.user.camper.dto.CamperBoardDTO;
import com.sbcamping.user.camper.dto.PageRequestDTO;
import com.sbcamping.user.camper.dto.PageResponseDTO;
import com.sbcamping.user.camper.service.CamperService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/campers")
public class CamperController {
    private final CamperService camperService;

    //게시글 목록
    @GetMapping("/list")
    public PageResponseDTO<CamperBoardDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list campers");
        log.info(pageRequestDTO.toString());
        return camperService.list(pageRequestDTO);
    }

    //게시글 상세 (model.mapper없이 구현)
    @GetMapping("/{cBoardId}")
    public CamperBoard get(@PathVariable Long cBoardId){
        CamperBoard article = camperService.get(cBoardId);
        log.info("상세정보" + article);
        return article;
    }

    //게시글 수정
    @PutMapping("/{cBoardId}")
    public ResponseEntity<CamperBoardDTO> modify(
            @PathVariable Long cBoardId,
            @RequestBody CamperBoardDTO camperBoardDTO) {

        // URL로 전달된 cBoardId를 DTO에 설정
        camperBoardDTO.setCBoardID(cBoardId);

        // 서비스 호출하여 수정 작업 수행
        camperService.modify(camperBoardDTO);

        // 수정된 DTO 반환
        return ResponseEntity.ok(camperBoardDTO);
    }


    //게시글 등록
    @PreAuthorize("ROLE_USER")
    @PostMapping("/")
    //Map<String(컬럼명과 같은 label의 개념), Long(컬럼명에 해당하는 Long타입의 cBoardID의 값을 의미)>
    public Map<String, Long> register(@RequestBody CamperBoardDTO camperBoardDTO){
        log.info("CamperBoardDTO: " + camperBoardDTO);
        Long cBoardId = camperService.register(camperBoardDTO);

        return Map.of("CBoardID: ", cBoardId);
    }

    //게시글 삭제
    @DeleteMapping("/{cBoardId}")
    public void remove(@PathVariable Long cBoardId){
        camperService.remove(cBoardId);
    }


}
