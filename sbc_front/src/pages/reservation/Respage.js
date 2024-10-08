import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./css/Respage.css";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const Respage = () => {
    const location = useLocation();

    const {year, month, day, siteName} = location.state || {};
    const [checkinDate, setCheckinDate] = useState('');

    useEffect(() => {
        if (year && month && day) {
            const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`

            setCheckinDate(formattedDate);
        }
    }, [year, month, day]);

    return (<div>
        <h3>예약페이지</h3>
        <Form
            style={{
                marginLeft: "10px",
            }}
        >
            <Form.Group as={Row} className="mb-3" controlId="siteName">
                <Form.Label column sm="2">
                    구역이름
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={siteName} readOnly={true}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="memberName">
                <Form.Label column sm="2">
                    회원명
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text"/>
                    <Form.Check
                        aria-label="option 1"
                        label={"회원명이 예약자랑 같습니까?"}
                        id="check"
                        style={{
                            paddingTop: "5px",
                        }}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="memberPhone">
                <Form.Label column sm="2">
                    회원 핸드폰번호
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="memberEmail">
                <Form.Label column sm="2">
                    이메일
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text"/>

                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="resName">
                <Form.Label column sm="2">
                    예약자명
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="resPhone">
                <Form.Label column sm="2">
                    예약자 핸드폰 번호
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="checkinDate">
                <Form.Label column sm="2">
                    입실날짜
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="date"
                        value={checkinDate}
                        onChange={(e) => setCheckinDate(e.target.value)}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="checkoutDate">
                <Form.Label column sm="2">
                    퇴실날짜
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="date"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="people">
                <Form.Label column sm="2">
                    입실인원
                </Form.Label>
                <Col sm="10">
                    <Form.Select aria-label="입실 인원수">
                        <option value="1">1명</option>
                        <option value="2">2명</option>
                        <option value="3">3명</option>
                        <option value="4">4명</option>
                        <option value="5">5명</option>
                        <option value="6">6명</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="totalpay">
                <Form.Label column sm="2">
                    결제금액
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text"/>
                </Col>
            </Form.Group>
        </Form>

        <Button variant="success">확인</Button>
        <Button variant="success">취소</Button>
    </div>);
};

export default Respage;
