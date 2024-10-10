package com.sbcamping.user.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration("userRootConfig")
public class RootConfig {
    @Bean("userMapper") //사용자 매퍼
    public ModelMapper getMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
                //STRICT 두 구조가 정확하게 일치하면 사용
                //LOOSE 불확실하더라도 유연하게 매핑
                .setMatchingStrategy(MatchingStrategies.STRICT);

        /*// CamperBoard와 CamperBoardDTO 간의 매핑 설정 추가
        modelMapper.addMappings(new PropertyMap<CamperBoard, CamperBoardDTO>() {
            @Override
            protected void configure() {
                // cBoardID 속성을 무시
                skip(destination.getCBoardID());

                // 나머지 속성을 명시적으로 매핑
                map().setCBoardCategory(source.getCBoardCategory());
                map().setCBoardTitle(source.getCBoardTitle());
                map().setCBoardContent(source.getCBoardContent());
                map().setCBoardViews(source.getCBoardViews());
                map().setCBoardDate(source.getCBoardDate());
                map().setCBoardAttachment(source.getCBoardAttachment());
            }*/
        return modelMapper;
    }
}
