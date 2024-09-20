package com.sbcamping.admin.site.service;

import com.sbcamping.admin.site.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SiteServiceImpl implements SiteService{

    @Autowired
    private SiteRepository siteRepository;

    @Override
    public List<Site> getSiteById(Long id) {}
}
