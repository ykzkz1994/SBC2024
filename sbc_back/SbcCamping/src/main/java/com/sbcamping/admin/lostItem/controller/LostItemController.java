package com.sbcamping.admin.lostItem.controller;

import com.sbcamping.admin.lostItem.service.LostItemService;
import com.sbcamping.domain.LostItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@RestController
@Slf4j
public class LostItemController {

    // src > common > config > WebClientConfig.class (파이썬 서버와 연결)
    @Autowired
    private WebClient webClient;

    @Autowired
    private LostItemService lostItemService;

    // 파이썬 이미지 분석
    @PostMapping("/java_service")
    public String serviceRequest(MultipartFile file, String message) {
        // 멀티파트 폼 데이터 구성
        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
        bodyBuilder.part("message", message);
        bodyBuilder.part("file", file.getResource());

        // 파이썬 결과를 String 으로 반환
        return webClient.post().uri("/detect")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
                .retrieve()
                .bodyToMono(String.class)// 본문을 String 타입으로 변환
                .block(); // 비동기 처리를 동기적으로 block 해서 결과 반환
    }

    // 분실물 저장
    @PostMapping("/lost/")
    public void addItem(@RequestBody LostItem lostItem) {
        log.info("------------ 분실물 추가 메소드");
        lostItemService.addItem(lostItem);
    }

}
