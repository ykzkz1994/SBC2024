package com.sbcamping.admin.camper.service;

import com.sbcamping.admin.camper.dto.CamperDTO;
import com.sbcamping.admin.camper.repository.CamperRepository;
import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.domain.CamperBoard;
import com.sbcamping.domain.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class CamperServiceImpl implements CamperService {

    @Autowired
    private final ModelMapper modelMapper;
    private final CamperRepository camperRepository;

    @Override
    public Long register(CamperDTO camperDTO) {
        log.info("-----------------");

        CamperBoard cb = modelMapper.map(camperDTO, CamperBoard.class);
        CamperBoard savedCb = camperRepository.save(cb);

        return savedCb.getCBoardID();
    }

    @Override
    public CamperDTO get(Long cbno) {
        java.util.Optional<CamperBoard> result = camperRepository.selectOne(cbno);

        CamperBoard cb = result.orElseThrow();
        CamperDTO camperDTO = entityToDTO(cb);
        return camperDTO;
    }

    @Override
    public void modify(CamperDTO camperDTO) {
        // 1. read
        Optional<CamperBoard> result = camperRepository.findById(camperDTO.getCBoardID());
        CamperBoard cb = result.orElseThrow();

        // 2. change 글머리, 제목, 내용
        cb.changeTitle(camperDTO.getCBoardTitle());
        cb.changeContent(camperDTO.getCBoardContent());
        cb.changeCategory(camperDTO.getCBoardCategory());

        camperRepository.save(cb);
    }

    @Override
    public void remove(Long cbno) {
        camperRepository.deleteById(cbno);
    }

    @Override
    public PageResponseDTO<CamperDTO> list(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() -1 , // 1페이지가 0이므로 주의
                pageRequestDTO.getSize(), Sort.by("cBoardID").descending());

        Page<CamperBoard> result = camperRepository.findAll(pageable);

        List<CamperDTO> dtoList = result.getContent().stream().map(cb ->
                modelMapper.map(cb, CamperDTO.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<CamperDTO> responseDTO = PageResponseDTO.<CamperDTO>withAll()
                .dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

        return responseDTO;
    }

    // 엔티티 -> DTO
    private CamperDTO entityToDTO(CamperBoard cb) {
        Member member = cb.getMember();

        CamperDTO camperDTO = CamperDTO.builder().cBoardID(cb.getCBoardID())
                .cBoardTitle(cb.getCBoardTitle()).cBoardContent(cb.getCBoardContent())
                .cBoardDate(cb.getCBoardDate()).cBoardCategory(cb.getCBoardCategory())
                .cBoardViews(cb.getCBoardViews()).member(cb.getMember()).build();

        return camperDTO;
    }

    // DTO -> 엔티티 : 미완성 ㅠㅠ
    private CamperBoard dTOToEntity(CamperDTO camperDTO) {

        // member어떻게?? 코딩??
        CamperBoard cb = CamperBoard.builder().cBoardID(camperDTO.getCBoardID()).cBoardTitle(camperDTO.getCBoardTitle())
                .cBoardContent(camperDTO.getCBoardContent()).cBoardDate(camperDTO.getCBoardDate()).cBoardViews(camperDTO.getCBoardViews())
                .cBoardCategory(camperDTO.getCBoardCategory()).build();

        return cb;
    }

}
