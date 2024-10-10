package com.sbcamping.common.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component("commonFileUtil")
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {

    @Value("${com.sbcamping.upload.campers.path}")
    private String campersUploadPath;

    @Value("${com.sbcamping.upload.qna.path}")
    private String qnaUploadPath;

    // 파일 업로드 작업
    public String saveFile(MultipartFile file, String type) throws RuntimeException {
        if (file == null || file.isEmpty()) {
            return null;  // 파일이 없거나 비어있으면 null 반환
        }

        String uploadPath = type.equals("campers") ? campersUploadPath : qnaUploadPath;
        String savedName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path savePath = Paths.get(uploadPath, savedName);
        String uploadName = null;

        try {
            // 파일 저장
            Files.copy(file.getInputStream(), savePath);
            String contentType = file.getContentType();

            // 이미지 여부 확인
            if (contentType != null && contentType.startsWith("image")) {
                Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);
                Thumbnails.of(savePath.toFile()).size(200, 200).toFile(thumbnailPath.toFile());
            }

            uploadName = savePath.toString();  // Windows 경로 설정
            log.info("저장될 이름 :" + uploadName);
        } catch (IOException e) {
            log.error("파일 저장 중 오류 발생. 경로: " + savePath.toString(), e);
            throw new RuntimeException("파일 저장에 실패했습니다: " + e.getMessage());
        }

        return uploadName;
    }

    // 업로드 파일 보여주기
    public ResponseEntity<Resource> getFile(String fileName, String type) {
        String uploadPath = type.equals("campers") ? campersUploadPath : qnaUploadPath;
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);

        if (!resource.exists()) {
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpg");
        }

        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    // 서버 내부에서 파일 삭제
    public void deleteFile(String fileName, String type) {
        if (fileName == null) {
            return;
        }

        String uploadPath = type.equals("campers") ? campersUploadPath : qnaUploadPath;
        String thumbnailFileName = "s_" + fileName;
        Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
        Path filePath = Paths.get(uploadPath, fileName);

        try {
            Files.deleteIfExists(filePath);  // 원본 파일 삭제
            log.info("원본 파일 삭제");
            Files.deleteIfExists(thumbnailPath);  // 썸네일 파일 삭제
            log.info("썸네일 파일 삭제");
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
