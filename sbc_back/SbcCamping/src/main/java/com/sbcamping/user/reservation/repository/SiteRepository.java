package com.sbcamping.user.reservation.repository;

import com.sbcamping.domain.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories(basePackages = "com.sbcamping.user.reservation.repository")      //적용범위 할당
public interface SiteRepository extends JpaRepository<Site, Long> {
}
