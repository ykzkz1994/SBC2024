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
          <Navbar.Brand href="/api/admin" id="logo">LOGO</Navbar.Brand>
          <div id="">
            <Nav className="justify-content-end">
              <Nav.Link href="#">로그아웃</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <NavDropdown href="/api/admin/site" title="구역 관리">
                <NavDropdown.Item href="/api/admin/site">구역 관리</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="캠핑장 예약 관리">
                <NavDropdown.Item href="/api/admin/res">전체 예약 리스트</NavDropdown.Item>
                <NavDropdown.Item href="#action5">날짜/구역별 예약 현황</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="회원 관리">
                <NavDropdown.Item href="/api/admin/member">전체 회원 리스트</NavDropdown.Item>
                <NavDropdown.Item href="#action5">휴면 회원 리스트</NavDropdown.Item>
                </NavDropdown>
              <NavDropdown title="커뮤니티 관리">
                <NavDropdown.Item href="/api/admin/notices">공지사항</NavDropdown.Item>
                <NavDropdown.Item href="/api/admin/qnas">문의 게시판</NavDropdown.Item>
                <NavDropdown.Item href="/api/admin/campers">캠퍼 게시판</NavDropdown.Item>
                <NavDropdown.Item href="/api/admin/reviews">리뷰 게시판</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="통계 관리">
                <NavDropdown.Item href="/api/admin/stats">매출 통계</NavDropdown.Item>
                <NavDropdown.Item href="#action5">추가 통계</NavDropdown.Item>
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
       
    </>
  );
};

export default BasicLayout;