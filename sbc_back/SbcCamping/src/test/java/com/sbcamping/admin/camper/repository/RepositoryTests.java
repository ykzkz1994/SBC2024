package com.sbcamping.admin.camper.repository;

import com.sbcamping.domain.CamperBoard;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
@Log4j2
public class RepositoryTests {

    @Autowired
    private CamperRepository camperRepository;

}
