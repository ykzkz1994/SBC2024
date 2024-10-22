import React from 'react';
import Form from 'react-bootstrap/Form';
import "./css/Respage.css";
import "./css/ResCheckPage.css"
import {useLocation, useNavigate} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ResCheckPage = () => {
    const location = useLocation();

    const {resData, resNumber, siteName} = location.state || {}

    const navigate = useNavigate()

    const handleSuccess = () => {
        navigate("/")
    }

    function formatPhoneNumber(phoneNumber) {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }

    const formattedNumber = formatPhoneNumber(resData.resUserPhone)

    return (
        <div className="mainDiv">
            <div>
                <h3>예약완료</h3>
                <Form className="mainForm">
                    <Form.Group as={Row} className="mb-0" controlId="resNumber">
                        <Form.Label className="label" column sm="3">
                            예약번호
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control className="formControl" type="text" value={resNumber} readOnly={true}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0" controlId="siteName">
                        <Form.Label className="label" column sm="3">
                            구역이름
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control className="formControl" type="text" value={siteName} readOnly={true}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0" controlId="resUserName">
                        <Form.Label className="label" column sm="3">
                            예약자명
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control className="formControl" type="text" value={resData.resUserName}
                                          readOnly={true}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0" controlId="resUserPhone">
                        <Form.Label className="label" column sm="3">
                            예약자 핸드폰 번호
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control className="formControl" type="text" value={formattedNumber}
                                          readOnly={true}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0" controlId="checkinDate">
                        <Form.Label className="label" column sm="3">
                            입실날짜
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control className="formControl" type="text" value={resData.checkinDate}
                                          readOnly={true}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0" controlId="checkoutDate">
                        <Form.Label className="label" column sm="3">
                            퇴실날짜
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control className="formControl" type="text" value={resData.checkoutDate}
                                          readOnly={true}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0" controlId="resPeople">
                        <Form.Label className="label" column sm="3">
                            입실인원
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control className="formControl" type="text" value={`${resData.resPeople}명`}
                                          readOnly={true}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-0" controlId="resTotalPay">
                        <Form.Label className="label" column sm="3">
                            결제금액
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control className="formControl" type="text" value={resData.resTotalPay}
                                          readOnly={true}/>
                        </Col>
                    </Form.Group>
                </Form>

                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <Button variant="success" className="checkSuccess" onClick={handleSuccess}>확인</Button>
                </div>
            </div>
        </div>
    );
};

export default ResCheckPage;