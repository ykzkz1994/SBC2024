package com.sbcamping.admin.notice.controller;

import com.sbcamping.admin.notice.dto.NoticeDTO;
import com.sbcamping.admin.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * 공지사항 관련 요청을 처리하는 REST 컨트롤러
 */
@RestController
@RequestMapping("/notice") // 기본 URL 경로 설정
@RequiredArgsConstructor // 의존성 주입을 위한 생성자 자동 생성
public class NoticeController {

    //불변 인스턴스변수 선언
    private final NoticeService noticeService;

    //공지글 생성 post입력 방식 메서드 
    @PostMapping
    public ResponseEntity<Void> createNotice(@RequestBody @Validated NoticeDTO noticeDTO) {
        noticeService.createNotice(noticeDTO.getNoticeTitle(), noticeDTO.getNoticeContent());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //아이디를 매개변수로 받아서 get방식으로 id에 해당하는 필드를 불러온다
    @GetMapping("/{id}")
    public ResponseEntity<NoticeDTO> readNotice(@PathVariable("id") Long noticeId) {
        NoticeDTO noticeDTO = noticeService.readNotice(noticeId);
        return new ResponseEntity<>(noticeDTO, HttpStatus.OK);
    }

    //아이디를 매개변수로 받아서 put방식으로 id에 해당하는 필드값을 수정한다
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNotice(
            @PathVariable("id") Long noticeId,
            @RequestBody @Validated NoticeDTO noticeDTO) {
        noticeService.updateNotice(noticeId, noticeDTO.getNoticeTitle(), noticeDTO.getNoticeContent());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //아이디를 매개변수로 받아서 id에 해당하는 로우를 삭제한다
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable("id") Long noticeId) {
        noticeService.deleteNotice(noticeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
