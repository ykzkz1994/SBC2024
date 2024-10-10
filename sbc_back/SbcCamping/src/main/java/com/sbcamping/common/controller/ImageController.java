package com.sbcamping.common.controller;

import com.sbcamping.common.dto.ImageDTO;
import com.sbcamping.common.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/images")
public class ImageController {
    private final CustomFileUtil fileUtil;

    @PostMapping("/campers")
    public Map<String, String> registerCampersImage(ImageDTO imageDTO) {
        log.info("registerCampersImage: " + imageDTO);
        List<MultipartFile> files = imageDTO.getFiles();

        // 업로드할 파일 개수 체크 (최대 2개)
        if (files.size() > 2) {
            throw new RuntimeException("최대 2개의 이미지 파일만 업로드할 수 있습니다.");
        }

        // 각 파일이 이미지인지 체크
        for (MultipartFile file : files) {
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image")) {
                throw new RuntimeException("업로드할 파일이 이미지가 아닙니다.");
            }
        }

        // campers 경로에 파일 저장
        List<String> uploadFileNames = new ArrayList<>();
        for (MultipartFile file : files) {
            String uploadFileName = fileUtil.saveFile(file, "campers");
            if (uploadFileName != null) {
                uploadFileNames.add(uploadFileName);
            }
        }

        imageDTO.setUploadFileNames(uploadFileNames);
        log.info("저장된 캠퍼스 이미지 파일명: " + uploadFileNames);

        return Map.of("Result", "SUCCESS");
    }

    @PostMapping("/qna")
    public Map<String, String> registerQnaImage(ImageDTO imageDTO) {
        log.info("registerQnaImage: " + imageDTO);
        List<MultipartFile> files = imageDTO.getFiles();

        // 업로드할 파일 개수 체크 (최대 2개)
        if (files.size() > 2) {
            throw new RuntimeException("최대 2개의 이미지 파일만 업로드할 수 있습니다.");
        }

        // 각 파일이 이미지인지 체크
        for (MultipartFile file : files) {
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image")) {
                throw new RuntimeException("업로드할 파일이 이미지가 아닙니다.");
            }
        }

        // qna 경로에 파일 저장
        List<String> uploadFileNames = new ArrayList<>();
        for (MultipartFile file : files) {
            String uploadFileName = fileUtil.saveFile(file, "qna");
            if (uploadFileName != null) {
                uploadFileNames.add(uploadFileName);
            }
        }

        imageDTO.setUploadFileNames(uploadFileNames);
        log.info("저장된 QnA 이미지 파일명: " + uploadFileNames);

        return Map.of("Result", "SUCCESS");
    }
}
