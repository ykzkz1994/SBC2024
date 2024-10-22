import React from 'react';
import Form from 'react-bootstrap/Form';
import "./css/Respage.css";
import "./css/ResCheckPage.css"
import {useLocation} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ResCheckPage = () => {
    const location = useLocation();

    const {resData, resNumber, siteName} = location.state || {}

    console.log(resData)
    console.log(resNumber)

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
                                <Form.Control  className="formControl focus:outline-none focus:shadow-none" type="text" value={resNumber} readOnly={true} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-0" controlId="siteName">
                            <Form.Label className="label" column sm="3">
                                구역이름
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control className="formControl focus:outline-none focus:shadow-none" type="text" value={siteName} readOnly={true} />
                            </Col>
                        </Form.Group>
                    </Form>
            </div>
        </div>
    );
};

export default ResCheckPage;