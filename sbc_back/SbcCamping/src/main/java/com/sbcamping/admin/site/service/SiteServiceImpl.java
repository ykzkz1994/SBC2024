package com.sbcamping.admin.site.service;

import com.sbcamping.admin.site.dto.SiteDTO;
import com.sbcamping.admin.site.repository.SiteRepository;
import com.sbcamping.domain.Site;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // 생성자 자동주입
public class SiteServiceImpl implements SiteService{

    //자동주입 대상은 final로 설정해야함
    //왜?
    //=>안정성과 불변성을 위해서 관행적으로
    //final로 설정시 해당 필드가 변경되지 않음을 명확하게 알 수 있기 때문에 코드의 가독성이 높아지고 유지보수에 용이해진다고 한다
    //다른 개발자들이 보면 단순히 주입받아서 사용한다는것을 한 눈에  봐도 알 수 있기 때문인 것 같음
    private final SiteRepository siteRepository;    //레포지토리 인스턴스
    private final ModelMapper modelMapper;  //매퍼 인스턴스

    @Override
    public Long readSite(SiteDTO siteDTO) {
        //디버깅용
        log.info("읽기 메서드");

        //ModelMapper를 이용하여  siteDTO객체=>Site엔티객체로 변환
        //modelMapper.map(siteDTO, Site.class)는 siteDTO의 필드 값을 Site 클래스의 필드에 자동으로 복사하여 새로운 Site 객체를 생성합니다.
        //Site객체를 site라는 변수에 저장
        Site site = modelMapper.map(siteDTO, Site.class);
        //사이트 레포지토리를 이용해서 위에서 생성한 site엔티티를 데이터베이스에 저장함
        //siteRepository.save(site)는 site 객체를 데이터베이스에 저장한 후, 저장된 결과를 반환
        Site savedSite = siteRepository.save(site);

        //site엔티티에서 pk인 SiteID를 반환한다
        return savedSite.getSiteID();
    }

    @Override
    public Long updateSite(SiteDTO siteDTO) {
        log.info("수정 메서드");
        return null;
    }
}
