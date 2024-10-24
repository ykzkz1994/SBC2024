import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/common.css';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../slice/loginSlice";
import {useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

import logo2 from "../images/logo/logo2-7.png";

const BasicLayout = ({children}) => {

    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const navigate = useNavigate();
    const loginState = useSelector(state => state.loginSlice);
    const dispatch = useDispatch();
    const handleClickLogout = () => {
        dispatch(logout());
        navigate("/");
    }


    return (
        <>
            <Navbar bg="white" data-bs-theme="light" className="navwrap">
                <Container>
                    <Navbar.Brand href="/" id="logo">
                        <img src={logo2} style={{width: '600px', height: 'auto'}} alt="logo"/>
                    </Navbar.Brand>
                    <div id="">
                        <Nav className="justify-content-end">

                            {!loginState.member.memberEmail ?
                                <Nav.Link href="/login">로그인</Nav.Link> : <Nav.Link href="/logout" onClick={handleClickLogout}>로그아웃</Nav.Link>
                            }

                             {/* 관리자가 아닌 경우에만 회원가입, 마이페이지, 사이트맵 표시 */}
                            {loginState.member?.memberRole !== 'ROLE_ADMIN' && (
                                /*중괄호안에 삼항연산자 바로 넣으면 오류나서 반태그추가*/
                            <>
                            {!loginState.member.memberEmail ?
                                <Nav.Link href="/join">회원가입</Nav.Link> : <Nav.Link href="/mypage">마이페이지</Nav.Link>
                            }
                            <Nav.Link href="#pricing">사이트맵</Nav.Link>
                             </>
                             )}


                            {/* 조건부 렌더링사용 권한 관리자 때만 관리자페이지로 이동텍스트 나이 나오게*/}
                             {loginState.member?.memberRole === 'ROLE_ADMIN' && (
                              <Nav.Link href="/admin" /*className="text-blue-500"*/>관리자페이지</Nav.Link>
                             )}
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
                                <NavDropdown.Item href="/qna">문의 게시판</NavDropdown.Item>
                                <NavDropdown.Item href="/campers">캠퍼 게시판</NavDropdown.Item>
                                <NavDropdown.Item href="/review">리뷰 게시판</NavDropdown.Item>
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
                        <span onClick={() => setShowTerms(true)} className="terms">개인정보처리방침</span>ㅣ
                        <span onClick={() => setShowPrivacy(true)} className="terms">이용약관</span>
                    </div>
                    <hr></hr>
                    <div className="text-center" id="footerinfo">
                        상호 : 서스펜션 브릿지 캠핑장 ㅣ 사업자번호 : 000-00-00000ㅣ 주소 : 경기 광명시 밤일안로42번길 69 (하안동) ㅣ 대표 : 반주연<br></br>
                        상담전화 : 031-1111-7777, 010-3113-1331 ㅣ 상담시간 : 09:00 ~ 18:00<br></br>
                        팩스 : 0303-0000-0000 ㅣ 이메일 : sbcproject@gmail.com<br></br>
                        Copyright © 2024 Suspension Bridge Camping.<br></br>All Rights Reserved.
                    </div>
                </Container>

                {/* 개인정보처리방침 모달창 */}
                <Modal
                    show={showTerms}
                    onHide={() => setShowTerms(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            개인정보처리방침
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        제1장 총칙<br></br>
                        <br></br>
                        제1조(목적)<br></br>
                        <br></br>
                        - 이 약관은 Suspension Bridge 캠핑장(이하 'SB캠핑장'라 합니다)가 제공하는 웹서비스(이하 '서비스'라 합니다)를 이용함에 있어 SB캠핑장과 회원 간의 권리·의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br></br>
                        <br></br>
                        제2조(정의)<br></br>
                        <br></br>
                        - 이 약관에서 사용하는 용어의 정의는 다음 각 호와 같습니다.<br></br>
                        <br></br>
                        01)이용자<br></br>
                        본 약관에 따라 SB캠핑장이 제공하는 서비스를 받는 자<br></br>
                        <br></br>
                        02)이용계약서비스<br></br>
                        이용과 관련하여 SB캠핑장과 이용자 간에 체결하는 계약<br></br>
                        <br></br>
                        03)가입<br></br>
                        SB캠핑장이 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용 계약을 완료시키는 행위<br></br>
                        <br></br>
                        04)회원<br></br>
                        당 사이트의 회원가입에 필요한 개인정보를 제공하여 회원 등록을 한 자<br></br>
                        <br></br>
                        07)EMAIL(회원번호)<br></br>
                        회원 식별과 회원의 서비스 이용을 위하여 이용자가 선정하고 SB캠핑장이 승인하는 영문자와 숫자@주소의 조합(하나의 본인확인계정에 하나의 EMAIL만 발급 가능함)<br></br>
                        <br></br>
                        07)PASSWORD(비밀번호)<br></br>
                        회원의 정보 보호를 위해 이용자 자신이 설정한 영문자와 숫자의 조합<br></br>
                        <br></br>
                        08)이용해지<br></br>
                        SB캠핑장 또는 회원이 서비스 이용계약을 종료시키는 의사표시<br></br>
                        <br></br>
                        제3조(약관의 효력과 변경)<br></br>
                        01)이 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 이용자에게 공시하고, 이에 동의한 이용자가 회원으로 가입함으로써 효력이 발생합니다.<br></br>
                        <br></br>
                        02)SB캠핑장은 필요하다고 인정되는 경우 이 약관의 내용을 변경할 수 있습니다. 변경된 약관은 서비스 화면에 공지하며, 공지 후 7일 이내에 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경 사항에 동의한 것으로 간주합니다.<br></br>
                        <br></br>
                        03)이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 본인의 회원등록을 취소할 수 있으며, 계속 사용하시는 경우에는 약관 변경에 동의한 것으로 간주하며 변경된 약관은 전항과 같은 방법으로 효력이 발생합니다.<br></br>
                        <br></br>
                        제4조(준용규정)<br></br>
                        <br></br>
                        - 이 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법 및 기타 관련법령의 규정에 따릅니다.<br></br>
                        <br></br>
                        제2장 서비스 이용계약<br></br>
                        <br></br>
                        제5조(이용계약의 성립)<br></br>
                        <br></br>
                        - 이용계약은 이용자인 회원의 이용신청과 이에 대한 SB캠핑장의 승낙으로 성립됩니다.<br></br>
                        <br></br>
                        제6조(이용신청)<br></br>
                        <br></br>
                        - 이용신청은 서비스의 회원정보 화면에서 이용자가 SB캠핑장에서 요구하는 가입신청서 양식에 개인의 신상정보를 기록하여 신청할 수 있습니다<br></br>
                        <br></br>
                        제7조(이용신청의 승낙)<br></br>
                        01)회원이 제6조의 신청서에서 정한 사항을 정확히 기재하여 이용신청을 하였을 경우에 특별한 사정이 없는 한 서비스 이용신청을 승낙합니다.<br></br>
                        <br></br>
                        02)다음 각 호에 해당하는 경우에는 이용 승낙을 하지 않을 수 있습니다. - 본인의 실명으로 신청하지 않았을 때 - 타인의 명의를 사용하여 신청하였을 때 - 이용신청의 내용을 허위로 기재한 경우 - 사회의 안녕 질서 또는 미풍양속을 저해할 목적으로 이용하였을 때 - 기타 SB캠핑장이 정한 이용신청 요건에 미비 되었을 때<br></br>
                        <br></br>
                        제8조(계약사항의 변경)<br></br>
                        <br></br>
                        - 회원은 회원정보관리를 통해 언제든지 자신의 정보를 열람하고 수정할 수 있습니다. 회원은 이용신청 시 기재한 사항이 변경되었을 때에는 수정을 하여야 하며, 수정하지 아니하여 발생하는 문제의 책임은 회원에게 있습니다.<br></br>
                        <br></br>
                        제3장 서비스 제공 및 이용<br></br>
                        <br></br>
                        제9조 (서비스 이용)<br></br>
                        01)SB캠핑장은 회원의 이용신청을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는 지정 된 일자부터 서비스를 개시합니다.<br></br>
                        <br></br>
                        02)SB캠핑장의 업무상 또는 기술상의 장애로 인하여 서비스를 하지 못하는 경우에는 사이트에 공시하거나 회원에게 이를 통지합니다.<br></br>
                        <br></br>
                        03)서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, SB캠핑장의 업무상 또는 기술상의 이유로 서비스가 일시 중지될 수 있고, 또한 정기점검 등 운영상의 목적으로 SB캠핑장이 정한 기간에는 서비스가 일시중지될 수 있습니다. 이러한 경우 SB캠핑장은 사전 또는 사후에 이를 공지합니다.<br></br>
                        <br></br>
                        04)회원에 가입한 후라도 일부 서비스는 특정 회원에게만 제공할 수 도 있습니다.<br></br>
                        <br></br>
                        05)SB캠핑장은 서비스를 일정범위로 분할하여 각 범위별로 이용가능 시간을 별도로 정할 수 있습니다. 이 경우 그 내용을 사전에 공지합니다.<br></br>
                        <br></br>
                        제10조 (서비스의 변경, 중지 및 정보의 저장과 사용)<br></br>
                        01)본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 국가의 비상사태, 정전, SB캠핑장의 관리범위 외의 서비스 설비 장애 및 기타 불가항력에 의하여 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실에 대해 SB캠핑장은 아무런 책임을 지지 않습니다.<br></br>
                        <br></br>
                        1. SB캠핑장이 정상적인 서비스 제공의 어려움으로 인하여 일시적으로 서비스를 중지하여야 할 경우에는 서비스 중지 1주일 전에 고지 후 서비스를 중지할 수 있으며, 이 기간 동안 회원이 고지내용을 인지하지 못한데 대하여 SB캠핑장은 책임을 지지 아니합니다. 특별한 사정이 있을 경우 위 사전 고지 기간은 단축되거나 생략될 수 있습니다. 또한 위 서비스 중지에 의하여 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등 의 내용이 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우 에 대하여도 SB캠핑장은 책임을 지지 않습니다.<br></br>
                        2. SB캠핑장의 사정으로 서비스를 영구적으로 중단하여야 할 경우 제2항을 준용합니다. 다만, 이 경우 사전 고지기간은 1개월로 합니다.<br></br>
                        3. SB캠핑장은 사전 고지 후 서비스를 일시적으로 수정, 변경 및 중단할 수 있으며, 이에 대하여 회원 또는 제3자에게 어떠한 책임도 부담하지 아니합니다.<br></br>
                        4. SB캠핑장은 회원이 이 약관의 내용에 위배되는 행동을 한 경우, 임의로 서비스 사용을 중지할 수 있습니다. 이 경우 SB캠핑장은 회원의 접속을 금지할 수 있으며, 회원이 게시한 내용의 전부 또는 일부를 임의로 삭제할 수 있습니다.<br></br>
                        5. 장기간 휴면 회원인 경우 안내 메일 또는 공지사항 발표 후 1주일간의 통지 기간을 거쳐 서비스 사용을 중지할 수 있습니다.<br></br>
                        <br></br>
                        제11조 (정보의 제공 및 광고의 게재)<br></br>
                        01)SB캠핑장은 회원이 서비스 이용 중 필요가 있다고 인정되는 다양한 정보 및 광고에 대해서는 전자우편이나 서신우편, SMS(핸드폰 문자메시지), DM, 메신저 등의 방법으로 회원에게 제공할 수 있으며, 만약 원치 않는 정보를 수신한 경우 회원은 이를 수신거부 할 수 있습니다.<br></br>
                        <br></br>
                        1. SB캠핑장은 서비스의 운용과 관련하여 서비스화면, 홈페이지, 전자우편 등에 광고 등을 게재할 수 있으며, SB캠핑장은 서비스를 이용하고자 하는 회원이 이 광고게재에 대하여 동의하는 것으로 간주합니다.<br></br>
                        2. SB캠핑장은 서비스 상에 게재되어 있거나 서비스를 통한 광고주와의 판촉활동에 회원이 참여하거나 교신 또는 거래의 결과로서 발생하는 모든 손실 또는 손해에 대해 책임을 지지 않습니다.<br></br>
                        <br></br>
                        제12조 (게시물 또는 내용물의 삭제)<br></br>
                        <br></br>
                        1. SB캠핑장은 회원이 게시하거나 등록하는 서비스 내의 모든 내용물이 다음 각 호의 - 경우에 해당 된다고 판단되는 경우 사전 통지 없이 삭제할 수 있으며, 이에 대해 SB캠핑장은 어떠한 책임도 지지 않습니다. - 사생활 침해나 명예훼손 등 타인의 권리가 침해된 경우 - 공공질서 및 미풍양속에 위반되는 내용인 경우 - 범죄적 행위에 결부된다고 인정되는 내용일 경우 - 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우 - 서비스 성격에 부합하지 않는 정보의 경우 - 기타 관계 법령 및 SB캠핑장에서 정한 규정 등에 위배되는 경우 - 게시된 내용이 이 약관에 위배되거나 상용 또는 비합법적, 불건전한 내용일 경우<br></br>
                        2. SB캠핑장은 서비스에 게시된 내용을 사전 통지한 날로부터 3일 경과 후 편집, 이동할 수 있는 권리를 보유합니다.<br></br>
                        3. SB캠핑장은 게시된 내용이 일정기간 이상 경과하여, 게시물로서 효력을 상실하였거나 게시목적이 불분명한 경우 공지사항 발표 후 1주일간의 통지기간을 거쳐 해당 게시물을 삭제할 수 있습니다.<br></br>
                        <br></br>
                        제13조 (게시물의 저작권)<br></br>
                        <br></br>
                        1. 회원이 서비스 내에 게시한 게시물의 저작권은 회원에게 있으며, SB캠핑장은 다른 서비스에서의 게재 등 활용할 수 있습니다.<br></br>
                        2. 회원의 게시물이 타인의 저작권, 프로그램 저작권 등을 침해함으로써 발생하는 민·형사상의 책임은 전적으로 회원이 부담하여야 합니다.<br></br>
                        3. 회원은 서비스를 이용하여 얻은 정보를 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.<br></br>
                        <br></br>
                        제14조 (SB캠핑장의 소유권)<br></br>
                        <br></br>
                        1. SB캠핑장이 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타 권리는 SB캠핑장에게 소유권이 있습니다.<br></br>
                        2. 회원은 SB캠핑장이 명시적으로 승인한 경우를 제외하고는 제1항 소정의 각 재산에 대한 전부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재라이선스, 담보권 설정행위, 상업적 이용행위를 할 수 없으며, 제3자로 하여금 이와 같은 행위를 하도록 허락할 수 없습니다.<br></br>
                        <br></br>
                        제4장 계약 당사자의 의무<br></br>
                        <br></br>
                        제15조 (회원의 의무 및 정보보안)<br></br>
                        01)회원은 서비스 이용을 위해 가입할 경우 현재의 사실과 일치하는 완전한 정보(이하 '가입정보'라 한다)를 제공하셔야 합니다. 또한 가입정보에 변경이 발생할 경우 즉시 갱신하셔야 합니다.<br></br>
                        <br></br>
                        1. 회원이 서비스 사용을 위한 가입절차를 완료하시면 EMAIL과 PASSWORD를 받게 됩니다. - 회원의 EMAIL, PASSWORD 분실 등으로 인해 발생한 손해는 SB캠핑장이 책임을 지지 않습니다. - 회원은 매 접속 종료 시 확실히 로그아웃을 하셔야 합니다.<br></br>
                        2. 회원은 서비스를 이용하면서 다음과 같은 행위를 할 수 없습니다.<br></br>
                        - 타인(소수를 포함)에게 위해를 가하는 행위<br></br>
                        - 타인의 EMAIL, PASSWORD, 계정 도용 및 타인으로 가장하는 행위<br></br>
                        - 타인과의 관계를 허위로 명시하는 행위<br></br>
                        - 타인을 비방할 목적으로 사실 또는 허위의 사실을 적시하여 명예를 훼손하는 행위<br></br>
                        - 자기 또는 타인에게 재산상의 이익을 주거나 타인에게 손해를 가할 목적으로 허위의 정보를 유통시키는 행위<br></br>
                        - 수치심이나 혐오감 또는 공포심을 일으키는 말이나 음향, 글이나 화상 또는 영상을 계속하여 상대방에게 도달하게 하여 상대방의 일상적 생활을 방해하는 행위<br></br>
                        - SB캠핑장의 사전 승낙 없이 서비스를 이용한 영리행위<br></br>
                        - 타인의 정보통신서비스 이용명의를 도용하여 사용하는 행위<br></br>
                        - 불필요하거나 승인되지 않은 광고, 판촉물을 게재하거나, '정크 메일(junk mail)', '스팸메일(spam mail)', '행운의 편지(chain letters)', - '도배글', '피라미드 조직' 등을 권유하거나 게시, 게재 또는 전자우편으로 보내는 행위<br></br>
                        - 저속 또는 음란한 데이터, 텍스트, 소프트웨어, 음악, 사진, 그래픽, 비디오 메시지 등(이하 '콘텐츠')을 게시, 게재 또는 전자우편으로 보내는 행위<br></br>
                        - 권리(지적재산권을 포함한 모든 권리)가 없는 콘텐츠를 게시, 게재 또는 전자우편으로 보내는 행위<br></br>
                        - 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비를 파괴, 방해 또는 기능을 제한하기 위한 소프트웨어 등을게시, 게재 또는 전자우편으로 보내는 행위 - 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시, 게재, 전자우편으로 보내는 행위 등 다른 사용자의 개인정보를 수집 또는 저장하는 행위 - 재물을 걸고 도박하거나 사행행위를 하는 행위<br></br>
                        - 윤락행위를 알선하거나 음행을 매개하는 내용의 정보를 유통시키는 행위<br></br>
                        - 기타 불법적이거나 부당한 행위<br></br>
                        1. 회원은 이 약관 및 관계법령에서 규정한 사항을 준수하여야 합니다.<br></br>
                        <br></br>
                        제16조 (개인정보보호정책)<br></br>
                        <br></br>
                        1. SB캠핑장은 회원가입 또는 서비스이용 신청시 회원이 제공하는 정보를 통하여 회원에 관한 정보를 수집하며, 회원의 개인정보는 본 이용계약의 이행과 본 이용계약상의 서비스제공을 위한 목적으로 이용합니다.<br></br>
                        2. SB캠핑장은 서비스 제공과 관련하여 취득한 회원의 정보를 본인의 승낙 없이 제3자에게 누설 또는 배포할 수 없으며 상업적 목적으로 사용할 수 없습니다. 다만, 다음의 각 호의 경우에는 그러하지 아니합니다. - 관계 법령에 의하여 수사상의 목적으로 관계기관으로부터 요구가 있는 경우 - 정보통신윤리위원회의 요청이 있는 경우 - 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우<br></br>
                        <br></br>
                        제5장 계약해지<br></br>
                        <br></br>
                        제18조 (계약해지 및 이용제한)<br></br>
                        01)회원이 이용계약을 해지하고자 하실 때에는 회원 본인이 직접 인터넷을 통해 당 사이트에 해지 신청을 하여야 합니다.<br></br>
                        <br></br>
                        02)SB캠핑장은 보안 및 EMAIL정책, 서비스의 원활한 제공 등과 같은 이유로 회원의 EMAIL 및 PASSWORD 변경을 요구하거나 제한 할 수 있습니다.<br></br>
                        <br></br>
                        1. SB캠핑장은 회원이 다음 각 호에 해당하는 행위를 하였을 경우 사전통지 없이 이용계약을 해지할 수 있습니다. - 비 실명가입, 본인확인계정의 도용 등 회원이 제공한 데이터가 허위임이 판명된 경우 - 범죄적 행위에 관련되는 경우 - 국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획 또는 실행할 경우 - 타인의 서비스 아이디 및 비밀 번호를 도용한 경우 - 타인의 명예를 손상시키거나 불이익을 주는 경우 - 같은 사용자가 다른 아이디로 이중 등록을 한 경우 - 서비스에 위해를 가하는 등 서비스의 건전한 이용을 저해하는 경우 - 기타 관련법령이나 SB캠핑장이 정한 이용조건에 위배되는 경우<br></br>
                        <br></br>
                        제6장 기 타<br></br>
                        <br></br>
                        제19조 (요금 및 유료정보)<br></br>
                        <br></br>
                        - 서비스 이용은 기본적으로 무료입니다. 단, 서비스에서 정한 별도의 유료 정보와 유료서비스에 대해서는 그러하지 아니합니다.<br></br>
                        <br></br>
                        제20조 (양도금지)<br></br>
                        <br></br>
                        - 회원은 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.<br></br>
                        <br></br>
                        제7장 손해배상 등<br></br>
                        <br></br>
                        제21조 (손해배상)<br></br>
                        <br></br>
                        - SB캠핑장은 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 SB캠핑장의 중대한 과실에 의한 경우를 제외하고 이에 대하여 책임을 부담하지 아니합니다.<br></br>
                        <br></br>
                        제22조 (면책조항)<br></br>
                        01)SB캠핑장은 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 제21조의 규정에 불구하고 서비스 제공에 대한 책임이 면제됩니다.<br></br>
                        <br></br>
                        1. SB캠핑장은 회원의 귀책사유로 인한 서비스이용의 장애에 대하여 책임을 지지 않습니다. - SB캠핑장은 회원이 서비스를 이용하여 기대하는 이익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다. - SB캠핑장은 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.<br></br>
                        <br></br>
                        제23조 (관할법원)<br></br>
                        <br></br>
                        - 서비스 이용과 관련하여 분쟁이 발생한 경우, SB캠핑장과 회원은 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다<br></br>
                        - 제1항의 규정에도 불구하고 서비스 이용으로 발생한 분쟁에 대하여 소송이 제기될 경우 SB캠핑장 소재지를 관할하는 법원을 관할법원으로 합니다.<br></br>
                        <br></br>
                        부칙<br></br>
                        <br></br>
                        - 이 약관은 2024년 9월 5일부터 시행합니다.
                    </Modal.Body>
                </Modal>

                {/* 이용약관 모달 */}
                <Modal
                    show={showPrivacy}
                    onHide={() => setShowPrivacy(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            이용약관
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        제1장 총 칙<br></br>
                        <br></br>
                        제1조(목적)<br></br>
                        이 약관은 Suspension Bridge 캠핑장(이하 'SB캠핑장'라 합니다)이 제공하는 웹 서비스(이하 '서비스'라 합니다)를 이용함에 있어 SB캠핑장과 회원 및 비회원 간의 권리·의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br></br>
                        <br></br>
                        제2조(정의)<br></br>
                        이 약관에서 사용하는 용어의 정의는 다음 각 호와 같습니다.<br></br>
                        <br></br>
                        1. 이용자<br></br>
                        본 약관에 따라 SB캠핑장이 제공하는 서비스를 받는 자<br></br>
                        2. 이용계약서비스<br></br>
                        이용과 관련하여 SB캠핑장과 이용자 간에 체결하는 계약<br></br>
                        3. 가입<br></br>
                        SB캠핑장이 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용 계약을 완료시키는 행위<br></br>
                        4. 회원<br></br>
                        당 사이트의 회원가입에 필요한 개인정보를 제공하여 회원 등록을 한 자<br></br>
                        5. EMAIL(이메일)회원 식별과 회원의 서비스 이용을 위하여 이용자가 선정하고 SB캠핑장이 승인하는 영문자와 숫자@주소 형태로 이루어진 조합<br></br>
                        6. PASSWORD(비밀번호)<br></br>
                        회원의 정보 보호를 위해 이용자 자신이 설정한 영문자와 숫자의 조합<br></br>
                        7. 이용해지<br></br>
                        SB캠핑장 또는 회원이 서비스 이용계약을 종료시키는 의사표시<br></br>
                        8. 비회원<br></br>
                        본인확인계정을 통해 당 사이트에 로그인 할 수 있는 자<br></br>
                        제3조(약관의 효력과 변경)<br></br>
                        ① 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 이용자에게 공시하고, 이에 동의한 이용자가 회원으로 가입함으로써 효력이 발생합니다.<br></br>
                        ② SB캠핑장은 필요하다고 인정되는 경우 이 약관의 내용을 변경할 수 있습니다. 변경된 약관은 서비스 화면에 공지하며, 공지 후 7일 이내에 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경 사항에 동의한 것으로 간주합니다.<br></br>
                        ③ 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 본인의 회원등록을 취소할 수 있으며, 계속 사용하시는 경우에는 약관 변경에 동의한 것으로 간주하며 변경된 약관은 전항과 같은 방법으로 효력이 발생합니다.<br></br>
                        제4조(준용규정)<br></br>
                        이 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법 및 기타 관련법령의 규정에 따릅니다.<br></br>
                        <br></br>
                        제2장 서비스 이용계약<br></br>
                        <br></br>
                        제5조(이용계약의 성립)<br></br>
                        이용계약은 이용자인 회원의 이용신청과 이에 대한 SB캠핑장의 승낙으로 성립됩니다.<br></br>
                        <br></br>
                        제6조(이용신청)<br></br>
                        이용신청은 서비스의 회원정보 화면에서 이용자가 SB캠핑장에서 요구하는 가입신청서 양식에 개인의 신상정보를 기록하여 신청할 수 있습니다.<br></br>
                        <br></br>
                        제7조(이용신청의 승낙)<br></br>
                        <br></br>
                        ① 회원이 제6조의 신청서에서 정한 사항을 정확히 기재하여 이용신청을 하였을 경우에 특별한 사정이 없는 한 서비스 이용신청을 승낙합니다.<br></br>
                        ② 다음 각 호에 해당하는 경우에 대하여는 그 신청에 대한 제한 사유가 해소될 때까지 승낙을 유보 또는 일부 서비스 이용을 제한할 수 있습니다.<br></br>
                        <br></br>
                        1. 내용이 허위(차명, 비실명, 본인확인계정 도용 등)인 것으로 판명되거나, 그러하다고 의심할만한 합리적인 사유가 발생할 경우<br></br>
                        2. 기타 SB캠핑장이 공익상 필요하다고 인정하는 경우<br></br>
                        ③ 다음 각 호에 해당하는 경우에는 이용 승낙을 하지 않을 수 있습니다.<br></br>
                        3. 본인의 실명으로 신청하지 않았을 때<br></br>
                        4. 타인의 명의를 사용하여 신청하였을 때<br></br>
                        5. 이용신청의 내용을 허위로 기재한 경우<br></br>
                        6. 사회의 안녕 질서 또는 미풍양속을 저해할 목적으로 이용하였을 때<br></br>
                        7. 기타 SB캠핑장이 정한 이용신청 요건에 미비 되었을 때<br></br>
                        <br></br>
                        제8조(계약사항의 변경)<br></br>
                        회원은 회원정보관리를 통해 언제든지 자신의 정보를 열람하고 수정할 수 있습니다. 회원은 이용신청 시 기재한 사항이 변경되었을 때에는 수정을 하여야 하며, 수정하지 아니하여 발생하는 문제의 책임은 회원에게 있습니다.<br></br>
                        <br></br>
                        제3장 서비스 제공 및 이용<br></br>
                        <br></br>
                        제9조 (서비스 이용)<br></br>
                        ① SB캠핑장은 회원의 이용신청을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는 지정 된 일자부터 서비스를 개시합니다.<br></br>
                        ② SB캠핑장의 업무상 또는 기술상의 장애로 인하여 서비스를 하지 못하는 경우에는 사이트에 공시하거나 회원에게 이를 통지합니다.<br></br>
                        ③ 서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, SB캠핑장의 업무상 또는 기술상의 이유로 서비스가 일시 중지될 수 있고, 또한 정기점검 등 운영상의 목적으로 SB캠핑장이 정한 기간에는 서비스가 일시 중지될 수 있습니다. 이러한 경우 SB캠핑장은 사전 또는 사후에 이를 공지합니다.<br></br>
                        ④ 회원에 가입한 후라도 일부 서비스는 특정 회원에게만 제공할 수 도 있습니다.<br></br>
                        ⑤ SB캠핑장은 서비스를 일정범위로 분할하여 각 범위별로 이용가능 시간을 별도로 정할 수 있습니다. 이 경우 그 내용을 사전에 공지합니다.<br></br>
                        <br></br>
                        제10조 (서비스의 변경, 중지 및 정보의 저장과 사용)<br></br>
                        ① 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 국가의 비상사태, 정전, SB캠핑장의 관리범위 외의 서비스 설비 장애 및 기타 불가항력에 의하여 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실에 대해 SB캠핑장은 아무런 책임을 지지 않습니다.<br></br>
                        ② SB캠핑장이 정상적인 서비스 제공의 어려움으로 인하여 일시적으로 서비스를 중지하여야 할 경우에는 서비스 중지 1주일 전에 고지 후 서비스를 중지할 수 있으며, 이 기간 동안 회원이 고지내용을 인지하지 못한데 대하여 SB캠핑장은 책임을 지지 아니합니다. 특별한 사정이 있을 경우 위 사전 고지 기간은 단축되거나 생략될 수 있습니다. 또한 위 서비스 중지에 의하여 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 대하여도 SB캠핑장은 책임을 지지 않습니다.<br></br>
                        ③ SB캠핑장의 사정으로 서비스를 영구적으로 중단하여야 할 경우 제2항을 준용합니다. 다만, 이 경우 사전 고지기간은 1개월로 합니다.<br></br>
                        ④ SB캠핑장은 사전 고지 후 서비스를 일시적으로 수정, 변경 및 중단할 수 있으며, 이에 대하여 회원 또는 제3자에게 어떠한 책임도 부담하지 아니합니다.<br></br>
                        ⑤ SB캠핑장은 회원이 이 약관의 내용에 위배되는 행동을 한 경우, 임의로 서비스 사용을 중지할 수 있습니다. 이 경우 SB캠핑장은 회원의 접속을 금지할 수 있으며, 회원이 게시한 내용의 전부 또는 일부를 임의로 삭제할 수 있습니다.<br></br>
                        ⑥ 3년이상 장기 미접속 회원의 경우 휴면 회원으로 전환됩니다.<br></br>
                        <br></br>
                        제11조 (정보의 제공 및 광고의 게재)<br></br>
                        <br></br>
                        ① SB캠핑장은 회원이 서비스 이용 중 필요가 있다고 인정되는 다양한 정보 및 광고에 대해서는 전자우편이나 서신우편, SMS(핸드폰 문자메시지), DM, 메신저 등의 방법으로 회원에게 제공할 수 있으며, 만약 원치 않는 정보를 수신한 경우 회원은 이를 수신거부 할 수 있습니다.<br></br>
                        ② SB캠핑장은 서비스의 운용과 관련하여 서비스화면, 홈페이지, 전자우편 등에 광고 등을 게재할 수 있으며, SB캠핑장은 서비스를 이용하고자 하는 회원이 이 광고게재에 대하여 동의하는 것으로 간주합니다.<br></br>
                        ③ SB캠핑장은 서비스 상에 게재되어 있거나 서비스를 통한 광고주와의 판촉활동에 회원이 참여하거나 교신 또는 거래의 결과로서 발생하는 모든 손실 또는 손해에 대해 책임을 지지 않습니다.<br></br>
                        제12조 (게시물 또는 내용물의 삭제)<br></br>
                        ① SB캠핑장은 회원 및 비회원이 게시하거나 등록하는 서비스 내의 모든 내용물이 다음 각 호의 경우에 해당 된다고 판단되는 경우 사전 통지 없이 삭제할 수 있으며, 이에 대해 SB캠핑장은 어떠한 책임도 지지 않습니다.<br></br>
                        <br></br>
                        1. 사생활 침해나 명예훼손 등 타인의 권리가 침해된 경우<br></br>
                        2. 공공질서 및 미풍양속에 위반되는 내용인 경우<br></br>
                        3. 범죄적 행위에 결부된다고 인정되는 내용일 경우<br></br>
                        4. 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우<br></br>
                        5. 서비스 성격에 부합하지 않는 정보의 경우<br></br>
                        6. 기타 관계 법령 및 SB캠핑장에서 정한 규정 등에 위배되는 경우<br></br>
                        7. 게시된 내용이 이 약관에 위배되거나 상용 또는 비합법적, 불건전한 내용일 경우<br></br>
                        ② SB캠핑장은 서비스에 게시된 내용을 사전 통지한 날로부터 3일 경과 후 편집, 이동할 수 있는 권리를 보유합니다.<br></br>
                        ③ SB캠핑장은 게시된 내용이 일정기간 이상 경과하여, 게시물로서 효력을 상실하였거나 게시목적이 불분명한 경우 공지사항 발표 후 1주일간의 통지기간을 거쳐 해당 게시물을 삭제할 수 있습니다.<br></br>
                        <br></br>
                        제13조 (게시물의 저작권)<br></br>
                        ① 회원 및 비회원이 서비스 내에 게시한 게시물의 저작권은 회원 및 비회원에게 있으며, SB캠핑장은 다른 서비스에서의 게재 등 활용할 수 있습니다.<br></br>
                        ② 회원 및 비회원의 게시물이 타인의 저작권, 프로그램 저작권 등을 침해함으로써 발생하는 민·형사상의 책임은 전적으로 회원 및 비회원이 부담하여야 합니다.<br></br>
                        ③ 회원 및 비회원은 서비스를 이용하여 얻은 정보를 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.<br></br>
                        <br></br>
                        제14조 (SB캠핑장의 소유권)<br></br>
                        ① SB캠핑장이 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타 권리는 SB캠핑장에게 소유권이 있습니다.<br></br>
                        ② SB캠핑장이 명시적으로 승인한 경우를 제외하고는 제1항 소정의 각 재산에 대한 전부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재라이선스, 담보권 설정행위, 상업적 이용행위를 할 수 없으며, 제3자로 하여금 이와 같은 행위를 하도록 허락할 수 없습니다.<br></br>
                        <br></br>
                        제4장 계약 당사자의 의무<br></br>
                        <br></br>
                        제15조 (회원·비회원의 의무 및 정보보안)<br></br>
                        ① 회원 및 비회원은 서비스 이용을 위해 가입할 경우 현재의 사실과 일치하는 완전한 정보(이하 '가입정보'라 한다)를 제공하셔야 합니다. 또한 가입정보에 변경이 발생할 경우 즉시 갱신하셔야 합니다.<br></br>
                        ② 회원이 서비스 사용을 위한 가입절차를 완료하시면 ID와 PASSWORD를 받게 됩니다.<br></br>
                        회원의 ID, PASSWORD 분실 등으로 인해 발생한 손해는 SB캠핑장이 책임을 지지 않습니다.<br></br>
                        회원은 매 접속 종료 시 확실히 로그아웃을 하셔야 합니다.<br></br>
                        ③ 회원 및 비회원은 서비스를 이용하면서 다음 각 호와 같은 행위를 할 수 없습니다.<br></br>
                        <br></br>
                        1. 타인(소수를 포함)에게 위해를 가하는 행위<br></br>
                        2. 타인의 ID, PASSWORD, 본인확인계정 도용 및 타인으로 가장하는 행위<br></br>
                        3. 타인과의 관계를 허위로 명시하는 행위<br></br>
                        4. 타인을 비방할 목적으로 사실 또는 허위의 사실을 적시하여 명예를 훼손하는 행위<br></br>
                        5. 자기 또는 타인에게 재산상의 이익을 주거나 타인에게 손해를 가할 목적으로 허위의 정보를 유통시키는 행위<br></br>
                        6. 수치심이나 혐오감 또는 공포심을 일으키는 말이나 음향, 글이나 화상 또는 영상을 계속하여 상대방에게 도달하게 하여 상대방의 일상적 생활을 방해하는 행위<br></br>
                        7. SB캠핑장의 사전 승낙 없이 서비스를 이용한 영리행위<br></br>
                        8. 타인의 정보통신서비스 이용명의를 도용하여 사용하는 행위<br></br>
                        9. 불필요하거나 승인되지 않은 광고, 판촉물을 게재하거나, '정크 메일(junk mail)', '스팸메일(spam mail)', '행운의 편지(chain letters)', '도배글', '피라미드 조직' 등을 권유하거나 게시, 게재 또는 전자우편으로 보내는 행위<br></br>
                        10. 저속 또는 음란한 데이터, 텍스트, 소프트웨어, 음악, 사진, 그래픽, 비디오 메시지 등(이하 '콘텐츠')을 게시, 게재 또는 전자우편으로 보내는 행위<br></br>
                        11. 권리(지적재산권을 포함한 모든 권리)가 없는 콘텐츠를 게시, 게재 또는 전자우편으로 보내는 행위<br></br>
                        12. 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비를 파괴, 방해 또는 기능을 제한하기 위한 소프트웨어 등을게시, 게재 또는 전자우편으로 보내는 행위<br></br>
                        13. 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시, 게재, 전자우편으로 보내는 행위 등 다른 사용자의 개인정보를 수집 또는 저장하는 행위<br></br>
                        14. 재물을 걸고 도박하거나 사행행위를 하는 행위<br></br>
                        15. 윤락행위를 알선하거나 음행을 매개하는 내용의 정보를 유통시키는 행위<br></br>
                        16. 기타 불법적이거나 부당한 행위<br></br>
                        <br></br>
                        ④ 회원 및 비회원은 이 약관 및 관계법령에서 규정한 사항을 준수하여야 합니다.<br></br>
                        ⑤ 제15조 제3항 각 호에 해당하는 행위로 인해 발생한 손해는 SB캠핑장이 책임을 지지 않으며 손해를 발생시킨 자는 관계 법령에 의해 처벌받을 수 있습니다.<br></br>
                        <br></br>
                        제16조 (SB캠핑장의 의무)<br></br>
                        ① SB캠핑장은 특별한 사정이 없는 한 회원이 신청한 서비스에 대해 1근무일 이내에 서비스를 이용할 수 있도록 합니다.<br></br>
                        ② SB캠핑장은 이 약관에서 정한 바에 따라 계속적, 안정적으로 서비스를 제공할 의무가 있습니다.<br></br>
                        ③ SB캠핑장이 제공하는 서비스로 인하여 회원에게 손해가 발생한 경우 그러한 손해가 SB캠핑장의 고의나 중과실에 의해 발생한 경우에 한하여 SB캠핑장에서 책임을 부담하며, 그 책임의 범위는 통상손해에 한합니다.<br></br>
                        ④ SB캠핑장은 회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 신속히 처리하여야 합니다. 다만, 신속한 처리가 곤란한 경우에는 회원에게 그 사유와 처리일정을 통보하여야 합니다.<br></br>
                        ⑤ SB캠핑장은 관련법령이 정하는 바에 따라서 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력합니다. 회원의 개인정보보호에 관해서는 관련법령 및 제17조에 제시된 내용을 지킵니다.<br></br>
                        <br></br>
                        제17조 (개인정보보호정책)<br></br>
                        ① SB캠핑장은 회원가입 또는 서비스이용 신청시 회원이 제공하는 정보를 통하여 회원에 관한 정보를 수집하며, 회원의 개인정보는 본 이용계약의 이행과 본 이용계약상의 서비스제공을 위한 목적으로 이용합니다.<br></br>
                        ② SB캠핑장은 서비스 제공과 관련하여 취득한 회원의 정보를 본인의 승낙 없이 제3자에게 누설 또는 배포할 수 없으며 상업적 목적으로 사용할 수 없습니다. 다만, 다음의 각 호의 경우에는 그러하지 아니합니다.<br></br>
                        <br></br>
                        1. 관계 법령에 의하여 수사상의 목적으로 관계기관으로부터 요구가 있는 경우<br></br>
                        2. 정보통신윤리위원회의 요청이 있는 경우<br></br>
                        3. 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우<br></br>
                        제5장 계약해지<br></br>
                        제18조 (계약해지 및 이용제한)<br></br>
                        ① 회원이 이용계약을 해지하고자 하실 때에는 회원 본인이 직접 인터넷을 통해 당 사이트에 해지 신청을 하여야 합니다.<br></br>
                        ② SB캠핑장은 보안 및 ID정책, 서비스의 원활한 제공 등과 같은 이유로 회원의 ID 및 PASSWORD 변경을 요구하거나 제한 할 수 있습니다.<br></br>
                        ③ SB캠핑장은 회원 및 비회원이 다음 각 호에 해당하는 행위를 하였을 경우 사전통지 없이 이용계약 해지 또는 이용제한 할 수 있습니다.<br></br>
                        4. 비 실명가입, 본인확인계정의 도용 등 회원 및 비회원이 제공한 데이터가 허위임이 판명된 경우<br></br>
                        5. 범죄적 행위에 관련되는 경우<br></br>
                        6. 국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획 또는 실행할 경우<br></br>
                        7. 타인의 서비스 아이디 및 비밀 번호를 도용한 경우<br></br>
                        8. 타인의 명예를 손상시키거나 불이익을 주는 경우<br></br>
                        9. 같은 사용자가 다른 아이디로 이중 등록을 한 경우<br></br>
                        10. 서비스에 위해를 가하는 등 서비스의 건전한 이용을 저해하는 경우<br></br>
                        11. 기타 관련법령이나 SB캠핑장이 정한 이용조건에 위배되는 경우<br></br>
                        <br></br>
                        제6장 기 타<br></br>
                        <br></br>
                        제19조 (요금 및 유료정보)<br></br>
                        서비스 이용은 기본적으로 무료입니다. 단, 서비스에서 정한 별도의 유료 정보와 유료서비스에 대해서는 그러하지 아니합니다.<br></br>
                        <br></br>
                        제20조 (양도금지)<br></br>
                        회원은 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.<br></br>
                        <br></br>
                        제7장 손해배상 등<br></br>
                        <br></br>
                        제21조 (손해배상)<br></br>
                        SB캠핑장은 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 SB캠핑장의 중대한 과실에 의한 경우를 제외하고 이에 대하여 책임을 부담하지 아니합니다.<br></br>
                        <br></br>
                        제22조 (면책조항)<br></br>
                        ① SB캠핑장은 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 제21조의 규정에 불구하고 서비스 제공에 대한 책임이 면제됩니다.<br></br>
                        ② SB캠핑장은 회원 및 비회원의 귀책사유로 인한 서비스이용의 장애에 대하여 책임을 지지 않습니다.<br></br>
                        ③ SB캠핑장은 회원 및 비회원이 서비스를 이용하여 기대하는 이익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.<br></br>
                        ④ SB캠핑장은 회원 및 비회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.<br></br>
                        제23조 (관할법원)<br></br>
                        ① 서비스 이용과 관련하여 분쟁이 발생한 경우, SB캠핑장과 회원 및 비회원은 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.<br></br>
                        ② 제1항의 규정에도 불구하고 서비스 이용으로 발생한 분쟁에 대하여 소송이 제기될 경우 SB캠핑장 소재지를 관할하는 법원을 관할법원으로 합니다.<br></br>
                        <br></br>
                        부 칙<br></br>
                        이 약관은 2024년 9월 5일부터 시행합니다.
                    </Modal.Body>
                </Modal>

            </footer>

        </>
    );
};

export default BasicLayout;