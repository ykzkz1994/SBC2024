package com.sbcamping.common.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public class ImageDTO {
        // 사진 번호: 이미지 파일에 대한 고유 식별자
        private Long pno;

        // 사진 이름: 업로드된 이미지의 파일명
        private String pname;

        // 사진 설명 또는 정렬 순서 (명확한 용도는 사용 사례에 따라 다를 수 있음)
        private String pdesc;

        // 업로드된 실제 파일을 저장하는 리스트 (MultipartFile: 파일 업로드 시 사용되는 스프링 클래스)
        // @Builder.Default를 사용해 기본값으로 빈 리스트를 설정
        @Builder.Default
        private List<MultipartFile> files = new ArrayList<>();

        // 업로드된 파일의 이름들을 저장하는 리스트 (업로드한 파일 이름을 추적)
        // 기본값으로 빈 리스트를 설정
        @Builder.Default
        private List<String> uploadFileNames = new ArrayList<>();
}
