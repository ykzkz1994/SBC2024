package com.sbcamping.admin.util;

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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {  // 파일 데이터 입출력 담당 util

    @Value("${com.sbcamping.upload.path}")
    private String uploadPath;

    // 파일 업로드 작업
    public String saveFile(MultipartFile file) throws RuntimeException {
        if (file == null) {
            return null;
        }

        String savedName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path savePath = Paths.get(uploadPath, savedName);
        String uploadName = null;

            try {
                Files.copy(file.getInputStream(), savePath);
                String contentType = file.getContentType();

                // 이미지 여부 확인
                if (contentType != null && contentType.startsWith("image")) {
                    Path thumbnailPath = Paths.get(uploadPath, "s_"+savedName);  // 's_'로 시작되는 썸네일 파일 함께 생성
                    Thumbnails.of(savePath.toFile()).size(200,200).toFile(thumbnailPath.toFile());
                }
                uploadName = savePath.toString();

            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }

        return uploadName;
    }

    // 업로드 파일 보여주기
    public ResponseEntity<Resource> getFile(String fileName) {
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
    public void deleteFile(String fileName) {
        if (fileName == null) {
            return;
        }
            String thumbnaileFileName = "s_" + fileName;
            Path thumbnailPath = Paths.get(uploadPath, thumbnaileFileName);
            Path filePath = Paths.get(uploadPath, fileName);

            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }

    }
}

