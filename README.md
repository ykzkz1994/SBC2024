## SBCamping Project 2024 🏕

### EMAIL
- 반주연 : <ukalliope@gmail.com>
- 이효진 : <leehyo9493@naver.com>
- 정상호 : <fkvmxpf94@gmail.com>
- 피성표 : <pisungpyo@naver.com>
- 하경민 : <xzxz2563@gmail.com>

### 프로젝트 소개
<br>

SB 캠핑장의 실시간 예약을 구현하였으며 캠핑 정보를 얻고 친목을 위한 커뮤니티를 운영합니다.

<br>


### 프로젝트 개요
<br>
- [x] [💿서비스 시연 영상](#서비스-시연-영상)
- [x] [🎯서비스 핵심기능](#서비스-핵심기능)
- [x] [🛠기술 스택](#기술-스택)
- [x] [🖥사이트 흐름도](#사이트-흐름도)
- [x] [🚧시스템 아키텍처](#시스템-아키텍처)
- [x] [📖ERD](#erd)
<br>
<hr/>
<br>
### 💿 서비스 시연 영상

<a href="https://youtu.be/xVME9QKvWd0" target="_blank">
    <img src="https://github.com/vanjooda/SBC2024/blob/main/sbc_front/src/images/logo/logo2-7.png" alt="서비스 시연 영상">
</a>

👆👆👆 로고를 클릭하면 영상 링크로 이동합니다 👆👆👆

<br>

### 🎯 서비스 핵심 기능

<br>

- **회원**
  - 로그인
  - 회원가입
  - 아이디 찾기
  - 비밀번호 찾기

- **마이페이지**
  - 나의 예약내역 조회
  - 회원 정보 조회, 수정
  - 회원 탈퇴

- **캠핑장 안내**
  - 캠핑장 소개
  - 시설 안내도
  - 찾아오시는 길

- **캠핑장 예약**
  - 예약/요금 안내
  - 실시간 예약 현황
  - 예약

- **공지사항**
  - 관리자 한정 게시물 작성

- **문의게시판**
  - 로그인 시에만 문의글 등록, 수정, 삭제
  - 게시판 검색
  - 이미지 업로드
  - 댓글 등록, 수정, 삭제

- **캠퍼게시판**
  - 로그인 시에만 문의글 등록, 수정, 삭제
  - 게시판 검색
  - 이미지 업로드
  - 댓글 등록, 수정, 삭제

- **리뷰게시판**
  - 예약한 내역이 사용 완료된 후 리뷰 작성 가능
  - 게시판 검색
  - 이미지 업로드

- **분실물 찾기**
  - 관리자 한정 분실물 등록, 수정, 삭제 가능
  - 이미지 분석
  - 게시판 검색
<br>
<hr />
<br>

### 🛠기술 스택
OS | Windows 10
--- | --- |
Language | ![Java](https://img.shields.io/badge/JAVA-000?style=for-the-badge&logo=java&logoColor=white) ![Spring](https://img.shields.io/badge/Spring-000?style=for-the-badge&logo=spring&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-000?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-000?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-000?style=for-the-badge&logo=javascript&logoColor=white)
IDE | ![SQL Developer](https://img.shields.io/badge/SQL%20Developer-000?style=for-the-badge&logo=oracle&logoColor=white) ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-000?style=for-the-badge&logo=intellijidea&logoColor=white)
Framework | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) 
Build Tool | ![apache groovy](https://img.shields.io/badge/Apache%20Groovy-4298B8?style=for-the-badge&logo=apachegroovy&logoColor=white)
Database | ![Oracle Database 11g](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white) ![redis](https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white)
Frontend | ![HTML5](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
Library | ![Spring Security](https://img.shields.io/badge/spring%20security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white) ![Thymeleaf](https://img.shields.io/badge/thymeleaf-005F0F?style=for-the-badge&logo=thymeleaf&logoColor=white) ![OAuth 2.0 Client](https://img.shields.io/badge/OAuth%202.0%20Client-4b4b4b?style=for-the-badge) ![jsonwebtokens](https://img.shields.io/badge/json%20web%20tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
API | ![Java Mail](https://img.shields.io/badge/Java%20Mail-3a75b0?style=for-the-badge) ![Daum Postcode](https://img.shields.io/badge/Daum%20Postcode-f94756?style=for-the-badge) ![coolSMS](https://img.shields.io/badge/cool%20SMS-f7943a?style=for-the-badge) ![kakaotalk](https://img.shields.io/badge/kakaotalk-FFCD00?style=for-the-badge) ![kakaomap](https://img.shields.io/badge/kakaomap-FFCD00?style=for-the-badge) ![naver](https://img.shields.io/badge/naver-03C75A?style=for-the-badge) ![tawk.to](https://img.shields.io/badge/tawk.to-000?style=for-the-badge&logo=tawk.to&logoColor=white) ![jpa](https://img.shields.io/badge/jpa-000?style=for-the-badge&logo=jpa&logoColor=white) 
Server |![Apache Tomcat 9.0](https://img.shields.io/badge/Apache%20Tomcat%20-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=black)
Version Control | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white) ![Notion](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white)


### 📖 DB 모델링

<br>

#### 1. 개체 관계도
<img src="https://github.com/vanjooda/SBC2024/blob/main/%EA%B0%9C%EC%B2%B4%EA%B4%80%EA%B3%84%EB%8F%84_%EC%B5%9C%EC%A2%85.png" alt="개체 관계도" width="400">

<br>

#### 2. 논리적 모델링
<img src="https://github.com/vanjooda/SBC2024/blob/main/%EB%85%BC%EB%A6%AC%EC%A0%81%EB%AA%A8%EB%8D%B8_%EC%B5%9C%EC%A2%85.png" alt="논리적 모델링" width="400">

<br>

#### 3. 물리적 모델링
<img src="https://github.com/vanjooda/SBC2024/blob/main/%EB%AC%BC%EB%A6%AC%EC%A0%81%EB%AA%A8%EB%8D%B8_%EC%B5%9C%EC%A2%85.png" alt="물리적 모델링" width="400">

<br>
