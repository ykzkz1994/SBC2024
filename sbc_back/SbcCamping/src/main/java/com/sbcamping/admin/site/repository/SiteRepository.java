package com.sbcamping.admin.site.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sbcamping.domain.Site;

// Site 엔티티에 대한 CRUD 작업을 제공하는 JpaRepository, 기본 키 타입은 Long
public interface SiteRepository extends JpaRepository<Site, Long> {

    @Query("SELECT s FROM Site s") // 올바른 JPQL 쿼리문
    Site[] getSiteList(); // 메서드 반환 타입을 배열로 변경
}
