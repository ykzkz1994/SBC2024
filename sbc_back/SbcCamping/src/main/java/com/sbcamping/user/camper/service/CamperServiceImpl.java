package com.sbcamping.user.camper.service;

import com.sbcamping.domain.CamperBoard;
import com.sbcamping.domain.NoticeBoard;
import com.sbcamping.exception.NoResultsFoundException;
import com.sbcamping.user.camper.dto.CamperBoardDTO;
import com.sbcamping.user.camper.dto.PageRequestDTO;
import com.sbcamping.user.camper.dto.PageResponseDTO;
import com.sbcamping.user.camper.dto.SearchDTO;
import com.sbcamping.user.camper.repository.CamperRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
// 생성자 자동 주입
@RequiredArgsConstructor
public class CamperServiceImpl implements CamperService {

    //자동 주입 대상은 final
    private final ModelMapper modelMapper;
    private final CamperRepository camperRepository;


    @Override
    public void register(String title,String content) {
        log.info("공지 등록 메서드 시작");//디버깅

        //게시글정보를 담은 객체 생성
        CamperBoard camperBoard = CamperBoard.builder()
                .cBoardTitle(title)
                .cBoardContent(content)
                //현재시간 할당, sysdate랑 비슷한가? =>p.s/변경사항 new Date였는데
                //LocalDateTime.now()로 변경 뉴데이트는 서버시간만 되는데 로컬데이트타임은 아마 시간 조정이 가능 한 듯?
                .cBoardDate(LocalDate.now())
                .cBoardViews(0L)//조회메서드가 실행 될 때마다 View가 1씩 증가하게 해놓으면 될 듯?
                .build();

        //데이터베이스 저장작업은 DB연결,제약조건위반등으로 실패 할 수 있기 때문에 예외처리를 해주는게 좋다고함
        try {
            //노티스 레포지토리를 이용해서 위에서 생성한 데이터를 담고있는 notice엔티티를 데이터베이스에 저장함
            //noticeRepository.save(notice)는 noticeBoard 객체를 데이터베이스에 저장한 후, 저장된 결과를 반환
            camperRepository.save(camperBoard);
            log.info("공지 등록 성공");
        } catch (Exception e) {//등록 실패처리

            log.error("공지 등록 실패: {}", e.getMessage());
            throw new RuntimeException("공지 등록 중 오류 발생", e);
        }

        log.info("공지 등록 메서드 끝");//디버깅
    }

    @Override
    public CamperBoard get(Long cBoardId) {
        CamperBoard camperBoard = camperRepository.findById(cBoardId)
                .orElseThrow(() -> new NoResultsFoundException("해당 캠퍼 보드를 찾을 수 없습니다."));

        CamperBoardDTO camperBoardDTO = modelMapper.map(camperBoard, CamperBoardDTO.class);

        return camperBoard;
    }
    //model.mapper없이 구현
//    @Override
//    public CamperBoard get(Long cBoardId) {
//        CamperBoard camperBoard = camperRepository.findById(cBoardId).orElseThrow();
//        return camperBoard;
//    }

    @Override
    public void modify(CamperBoardDTO camperBoardDTO) {
        Optional<CamperBoard> result = camperRepository.findById(camperBoardDTO.getCBoardID());

        CamperBoard camperBoard = result.orElseThrow(null);

        if (camperBoardDTO.getCBoardCategory() != null) {
            camperBoard.changeCategory(camperBoardDTO.getCBoardCategory());
        }

        if (camperBoardDTO.getCBoardTitle() != null) {
            camperBoard.changeTitle(camperBoardDTO.getCBoardTitle());
        }

        if (camperBoardDTO.getCBoardContent() != null) {
            camperBoard.changeContent(camperBoardDTO.getCBoardContent());
        }

        if (camperBoardDTO.getCBoardAttachment() != null) {
            camperBoard.changeAttachment(camperBoardDTO.getCBoardAttachment());
        }


        camperRepository.save(camperBoard);
    }

    @Override
    public void remove(Long cBoardId) {
        camperRepository.deleteById(cBoardId);
    }

    @Override
    public PageResponseDTO<CamperBoardDTO> list(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() -1, //1페이지가 0이므로 주의
                pageRequestDTO.getSize(), Sort.by("cBoardID").descending());

        Page<CamperBoard> result = camperRepository.findAll(pageable);

        List<CamperBoardDTO> dtoList = result.getContent().stream().map(camperBoard ->
                modelMapper.map(camperBoard, CamperBoardDTO.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<CamperBoardDTO> responseDTO = PageResponseDTO.<CamperBoardDTO>withAll()
                .dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

        return responseDTO;
    }

    @Override
    public List<CamperBoardDTO> search(SearchDTO searchDTO) {
        List<CamperBoard> camperBoards = camperRepository.findByKeyword(searchDTO.getKeyword());
        //검색 결과가 비어있을 때 예외 설정
        if (camperBoards.isEmpty()) {
            throw new NoResultsFoundException("검색 결과가 없습니다.");
        }

        return camperBoards.stream()
                .map(camperBoard -> CamperBoardDTO.builder()
                        .cBoardID(camperBoard.getCBoardID())
                        .member(camperBoard.getMember())
                        .cBoardCategory(camperBoard.getCBoardCategory())
                        .cBoardTitle(camperBoard.getCBoardTitle())
                        .cBoardContent(camperBoard.getCBoardContent())
                        .cBoardViews(camperBoard.getCBoardViews())
                        .cBoardDate(camperBoard.getCBoardDate())
                        .cBoardAttachment(camperBoard.getCBoardAttachment())
                        .build())
                .collect(Collectors.toList());
    }

}
