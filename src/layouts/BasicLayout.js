import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/common.css';

const BasicLayout = ({ children }) => {
  return (
    <>
        <Navbar bg="white" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/" id="logo">LOGO</Navbar.Brand>
          <div id="">
            <Nav className="justify-content-end">
              <Nav.Link href="/login">로그인</Nav.Link>
              <Nav.Link href="#features">회원가입</Nav.Link>
              <Nav.Link href="#pricing">사이트맵</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <NavDropdown title="캠핑장안내">
                <NavDropdown.Item href="/camping/intro">캠핑장소개</NavDropdown.Item>
                <NavDropdown.Item href="/camping/guide">시설안내도</NavDropdown.Item>
                <NavDropdown.Item href="/camping/how">찾아오시는 길</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="실시간예약">
                <NavDropdown.Item href="/res/info">예약/요금안내</NavDropdown.Item>
                <NavDropdown.Item href="/res/realtime">실시간예약</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="커뮤니티">
                <NavDropdown.Item href="/notice">공지사항</NavDropdown.Item>
                <NavDropdown.Item href="#action4">문의 게시판</NavDropdown.Item>
                <NavDropdown.Item href="#action5">캠퍼 게시판</NavDropdown.Item>
                <NavDropdown.Item href="#action5">리뷰 게시판</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
          
        </Container>
      </Navbar>
      
        <main id="mainwrap">
        <Container>
          {children}
          </Container>
          </main>
        <footer id="footerwrap">
        <Container>
            <div className="text-center">
            개인정보처리방침ㅣ 이용약관
            </div>
            <hr></hr>
            <div className="text-center" id="footerinfo">
            상호 : 서스펜션 브릿지 캠핑장 ㅣ 사업자번호 : 000-00-00000ㅣ 주소 : 경기 광명시 밤일안로42번길 69 (하안동) ㅣ 대표 : 반주연
            <br></br>
            상담전화 : 031-1111-7777, 010-3113-1331 ㅣ 상담시간 : 09:00 ~ 18:00
            <br></br>
            팩스 : 0303-0000-0000 ㅣ 이메일 : sbcproject@gmail.com
            <br></br>
            Copyright © 2024 Suspension Bridge Camping. 
            <br></br>All Rights Reserved.
            </div>
        </Container>
        </footer>
      
    </>
  );
};

export default BasicLayout;
