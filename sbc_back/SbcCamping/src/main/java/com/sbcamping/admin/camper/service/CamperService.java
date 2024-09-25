package com.sbcamping.admin.camper.service;

import com.sbcamping.admin.camper.dto.CamperDTO;
import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;

public interface CamperService {
    Long register(CamperDTO camperDTO);
    CamperDTO get(Long cbno);
    void modify(CamperDTO camperDTO);
    void remove(Long cbno);
    PageResponseDTO<CamperDTO> list(PageRequestDTO pageRequestDTO);

}
