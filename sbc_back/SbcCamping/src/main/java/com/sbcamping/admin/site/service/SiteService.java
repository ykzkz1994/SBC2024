package com.sbcamping.admin.site.service;

import com.sbcamping.admin.site.dto.SiteDTO;

public interface SiteService {

    Long readSite(SiteDTO siteDTO); //구역 조회
    Long updateSite(SiteDTO siteDTO);   //구역수정

}
