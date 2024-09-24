package com.sbcamping.admin.site.service;

import com.sbcamping.admin.site.dto.SiteDTO;
import jakarta.transaction.Transactional;

@Transactional //데이터의 무결성 보장, 메서드 정상적 완료시 커밋 오류가 발생하면 롤백하는 어노테이션
public interface SiteService {

    SiteDTO getSiteById(Long siteID); //

}
