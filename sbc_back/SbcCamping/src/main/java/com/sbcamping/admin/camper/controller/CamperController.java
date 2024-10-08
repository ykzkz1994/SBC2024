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



    // 댓글 목록
    // 댓글 등록
    // 댓글 수정
    // 댓글 삭제
}
