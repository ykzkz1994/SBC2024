import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Modal, Form } from 'react-bootstrap';

// **상수 선언**
// 최대 허용 인원 수를 상수로 선언하여 코드의 의도를 명확히 하고 유지보수를 용이하게 합니다.
const MAX_ALLOWED_PEOPLE = 6;

// **SiteManagements 컴포넌트 정의**
const SiteManagements = () => {
    // **상태 관리**
    // sites: 구역 정보 목록을 저장합니다.
    const [sites, setSites] = useState([
        { id: 1, siteName: 'Deck A', reservationLimit: 'N', minPeople: 4, maxPeople: 6, weekdayRate: 50000, weekendRate: 80000 },
        { id: 2, siteName: 'Deck B', reservationLimit: 'N', minPeople: 4, maxPeople: 6, weekdayRate: 40000, weekendRate: 80000 },
        { id: 3, siteName: 'Deck C', reservationLimit: 'N', minPeople: 4, maxPeople: 6, weekdayRate: 40000, weekendRate: 80000 },
        { id: 4, siteName: 'Deck D', reservationLimit: 'Y', minPeople: 4, maxPeople: 6, weekdayRate: 40000, weekendRate: 80000 },
        { id: 5, siteName: 'Deck E', reservationLimit: 'N', minPeople: 3, maxPeople: 5, weekdayRate: 45000, weekendRate: 75000 },
        { id: 6, siteName: 'Deck F', reservationLimit: 'Y', minPeople: 2, maxPeople: 4, weekdayRate: 35000, weekendRate: 70000 },
        { id: 7, siteName: 'Deck G', reservationLimit: 'N', minPeople: 5, maxPeople: 8, weekdayRate: 60000, weekendRate: 90000 },
        { id: 8, siteName: 'Deck H', reservationLimit: 'Y', minPeople: 3, maxPeople: 6, weekdayRate: 55000, weekendRate: 85000 },
        { id: 9, siteName: 'Deck I', reservationLimit: 'N', minPeople: 4, maxPeople: 7, weekdayRate: 50000, weekendRate: 80000 },
        { id: 10, siteName: 'Deck J', reservationLimit: 'Y', minPeople: 2, maxPeople: 4, weekdayRate: 45000, weekendRate: 70000 },
    ]);

    // showModal: 수정 모달 창의 표시 여부를 관리합니다.
    const [showModal, setShowModal] = useState(false);

    // selectedSite: 현재 선택된 구역의 정보를 저장합니다.
    const [selectedSite, setSelectedSite] = useState(null);

    // newValues: 모달 창에서 수정된 새로운 값을 임시로 저장합니다.
    const [newValues, setNewValues] = useState({});

    // showReviewModal: 수정 확인 모달 창의 표시 여부를 관리합니다.
    const [showReviewModal, setShowReviewModal] = useState(false);

    // error: 입력 검증 시 발생한 에러 메시지를 저장합니다.
    const [error, setError] = useState('');

    // siteNameRef: 구역 이름 입력 필드에 대한 참조를 생성하여 자동 포커스를 설정할 때 사용합니다.
    const siteNameRef = useRef(null);

    // **useEffect 훅**
    // showModal 상태가 변경될 때마다 실행되며, 모달이 열릴 때 구역 이름 입력 필드에 자동으로 포커스를 설정합니다.
    useEffect(() => {
        if (showModal && siteNameRef.current) {
            siteNameRef.current.focus();
        }
    }, [showModal]);

    // **모달 창 열기 함수**
    // 선택한 구역의 정보를 설정하고 수정 모달 창을 엽니다.
    const handleShowModal = (site) => {
        setSelectedSite(site); // 선택된 구역 정보를 상태에 저장
        setNewValues(site);    // 선택된 구역 정보를 수정할 수 있도록 새로운 값으로 설정
        setShowModal(true);    // 수정 모달 창을 표시
    };

    // **모달 창 닫기 함수**
    // 수정 모달 창을 닫고 선택된 구역 정보를 초기화합니다.
    const handleCloseModal = () => {
        setShowModal(false);      // 수정 모달 창을 숨김
        setSelectedSite(null);    // 선택된 구역 정보 초기화
        setNewValues({});         // 수정된 값 초기화
        setError('');             // 에러 메시지 초기화
    };

    // **수정 사항 저장 함수**
    // 입력된 값을 검증한 후 수정 확인 모달 창을 엽니다.
    const handleSaveChanges = () => {
        // 기준 인원이 최대 인원보다 큰지 검증
        if (newValues.minPeople > newValues.maxPeople) {
            setError('기준 인원은 최대 인원보다 클 수 없습니다.');
            return; // 검증 실패 시 함수 종료
        }
        // 추가적인 검증 로직을 여기에 추가할 수 있습니다.

        setShowModal(false);         // 수정 모달 창을 숨김
        setShowReviewModal(true);    // 수정 확인 모달 창을 표시
    };

    // **최종 수정 저장 함수**
    // 실제로 sites 상태를 업데이트하여 변경 사항을 저장합니다.
    const handleFinalSave = () => {
        setSites((prevSites) =>
            prevSites.map((site) =>
                site.id === selectedSite.id ? { ...site, ...newValues } : site
            )
        );
        setShowReviewModal(false);  // 수정 확인 모달 창을 숨김
        setSelectedSite(null);      // 선택된 구역 정보 초기화
        setNewValues({});           // 수정된 값 초기화
        setError('');               // 에러 메시지 초기화
    };

   /* // **구역 삭제 함수**
    // 특정 구역을 삭제하는 기능을 제공합니다.
    const handleDelete = (siteId) => {
        // 사용자에게 삭제 확인을 요청합니다.
        if (window.confirm('정말 삭제하시겠습니까?')) {
            // sites 배열에서 해당 구역을 제거합니다.
            setSites(sites.filter(site => site.id !== siteId));
        }
    };*/

    // **입력 필드 변경 처리 함수 - 텍스트 필드**
    // 텍스트 기반 입력 필드의 값 변경을 처리합니다.
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setNewValues((prev) => ({ ...prev, [name]: value }));
        setError(''); // 입력 변경 시 에러 메시지를 초기화
    };

    // **입력 필드 변경 처리 함수 - 숫자 필드**
    // 숫자 기반 입력 필드의 값 변경을 처리하고 검증합니다.
    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const numberValue = Number(value);

        // 'maxPeople' 필드의 경우 최대 인원 제한을 검증합니다.
        if (name === 'maxPeople' && numberValue > MAX_ALLOWED_PEOPLE) {
            setError(`최대 인원은 ${MAX_ALLOWED_PEOPLE}명을 초과할 수 없습니다.`);
            return; // 검증 실패 시 함수 종료
        }

        setNewValues((prev) => ({ ...prev, [name]: numberValue }));
        setError(''); // 입력 변경 시 에러 메시지를 초기화
    };

    // **입력 필드 변경 처리 함수 - 요금 필드**
    // 요금 입력 필드의 값 변경을 처리하고 숫자로 변환합니다.
    const handleRateChange = (e) => {
        const { name, value } = e.target;
        // 입력된 값에서 쉼표를 제거하여 숫자만 추출
        const numericValue = value.replace(/,/g, '');
        // 숫자인지 확인하고, 숫자일 경우 새로운 값으로 설정
        if (!isNaN(numericValue) && numericValue.trim() !== '') {
            setNewValues((prev) => ({
                ...prev,
                [name]: Number(numericValue),
            }));
        }
    };

    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* **페이지 제목** */}
            <h2 className="text-2xl font-bold mb-4">구역 관리</h2>

            {/* **구역 정보 테이블** */}
            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr className="bg-green-200">
                    <th style={{ minWidth: '80px', maxWidth: '100px' }}>구역 번호</th>
                    <th style={{ minWidth: '100px', maxWidth: '150px' }}>구역 이름</th>
                    <th style={{ minWidth: '80px', maxWidth: '120px' }}>예약 제한</th>
                    <th style={{ minWidth: '80px', maxWidth: '120px' }}>기준 인원</th>
                    <th style={{ minWidth: '80px', maxWidth: '120px' }}>최대 인원</th>
                    <th style={{ minWidth: '120px', maxWidth: '160px' }}>평일 요금</th>
                    <th style={{ minWidth: '120px', maxWidth: '160px' }}>주말 요금</th>
                    <th style={{ minWidth: '120px', maxWidth: '160px' }}>요금표 설정</th>
                </tr>
                </thead>
                <tbody>
                {/* sites 배열을 순회하여 각 구역의 정보를 테이블에 표시 */}
                {sites.map((site) => (
                    <tr key={site.id}>
                        <td>{site.id}</td>
                        <td>{site.siteName}</td>
                        <td>{site.reservationLimit === 'Y' ? '예약 가능' : '예약 불가능'}</td>
                        <td>{site.minPeople}</td>
                        <td>{site.maxPeople}</td>
                        {/* 요금은 숫자에 쉼표를 추가하여 가독성을 높입니다 */}
                        <td>{site.weekdayRate.toLocaleString()}</td>
                        <td>{site.weekendRate.toLocaleString()}</td>
                        <td>
                            {/* **수정하기 버튼** */}
                            <Button
                                variant="secondary"
                                className="w-full mb-2"
                                onClick={() => handleShowModal(site)} // 클릭 시 해당 구역을 수정하기 위한 모달 열기
                            >
                                수정하기
                            </Button>
                            {/* **삭제 버튼** */}
                    {/*        <Button
                                variant="danger"
                                className="w-full"
                                onClick={() => handleDelete(site.id)} // 클릭 시 해당 구역 삭제
                            >
                                삭제
                            </Button>*/}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* **수정 모달 창** */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>구역 수정 - {selectedSite?.id}번</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedSite && (
                        <div>
                            {/* **구역 이름 입력 필드** */}
                            <Form.Group className="mb-3">
                                <Form.Label>구역 이름</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="siteName"
                                    value={newValues.siteName || ''}
                                    onChange={handleTextChange} // 값 변경 시 handleTextChange 함수 호출
                                    ref={siteNameRef}          // 자동 포커스를 위한 참조 설정
                                />
                            </Form.Group>

                            {/* **예약 제한 라디오 버튼** */}
                            <Form.Group className="mb-3">
                                <Form.Label>예약 제한</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="예약 가능"
                                    name="reservationLimit"
                                    value="Y"
                                    checked={newValues.reservationLimit === 'Y'}
                                    onChange={handleTextChange} // 값 변경 시 handleTextChange 함수 호출
                                />
                                <Form.Check
                                    type="radio"
                                    label="예약 불가능"
                                    name="reservationLimit"
                                    value="N"
                                    checked={newValues.reservationLimit === 'N'}
                                    onChange={handleTextChange} // 값 변경 시 handleTextChange 함수 호출
                                />
                            </Form.Group>

                            {/* **기준 인원 입력 필드** */}
                            <Form.Group className="mb-3">
                                <Form.Label>기준 인원</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="minPeople"
                                    value={newValues.minPeople || ''}
                                    onChange={handleNumberChange} // 값 변경 시 handleNumberChange 함수 호출
                                    min={1}                       // 최소값 설정
                                    max={MAX_ALLOWED_PEOPLE}      // 최대값 설정
                                />
                            </Form.Group>

                            {/* **최대 인원 입력 필드** */}
                            <Form.Group className="mb-3">
                                <Form.Label>최대 인원</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="maxPeople"
                                    value={newValues.maxPeople || ''}
                                    onChange={handleNumberChange} // 값 변경 시 handleNumberChange 함수 호출
                                    min={1}                       // 최소값 설정
                                    max={MAX_ALLOWED_PEOPLE}      // 최대값 설정
                                />
                            </Form.Group>

                            {/* **평일 요금 입력 필드** */}
                            <Form.Group className="mb-3">
                                <Form.Label>평일 요금</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="weekdayRate"
                                    value={newValues.weekdayRate?.toLocaleString() || ''}
                                    onChange={handleRateChange} // 값 변경 시 handleRateChange 함수 호출
                                />
                            </Form.Group>

                            {/* **주말 요금 입력 필드** */}
                            <Form.Group className="mb-3">
                                <Form.Label>주말 요금</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="weekendRate"
                                    value={newValues.weekendRate?.toLocaleString() || ''}
                                    onChange={handleRateChange} // 값 변경 시 handleRateChange 함수 호출
                                />
                            </Form.Group>

                            {/* **에러 메시지 표시** */}
                            {error && <div className="text-danger">{error}</div>}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {/* **취소 버튼** */}
                    <Button variant="secondary" onClick={handleCloseModal}>
                        취소
                    </Button>
                    {/* **저장 버튼** */}
                    <Button variant="primary" onClick={handleSaveChanges}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* **수정 확인 모달 창** */}
            <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>구역 수정 확인 - {selectedSite?.id}번</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedSite && (
                        <div>
                            {/* 수정 전후의 값들을 비교하여 표시 */}
                            <p><strong>구역 번호:</strong> {selectedSite.id}</p>
                            <p><strong>구역 이름:</strong> {selectedSite.siteName} => {newValues.siteName}</p>
                            <p><strong>예약 제한:</strong> {selectedSite.reservationLimit === 'Y' ? '예약 가능' : '예약 불가능'} => {newValues.reservationLimit === 'Y' ? '예약 가능' : '예약 불가능'}</p>
                            <p><strong>기준 인원:</strong> {selectedSite.minPeople} => {newValues.minPeople}</p>
                            <p><strong>최대 인원:</strong> {selectedSite.maxPeople} => {newValues.maxPeople}</p>
                            <p><strong>평일 요금:</strong> {selectedSite.weekdayRate.toLocaleString()} => {newValues.weekdayRate.toLocaleString()}</p>
                            <p><strong>주말 요금:</strong> {selectedSite.weekendRate.toLocaleString()} => {newValues.weekendRate.toLocaleString()}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {/* **취소 버튼** */}
                    <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
                        취소
                    </Button>
                    {/* **최종 수정 버튼** */}
                    <Button variant="primary" onClick={handleFinalSave}>
                        최종 수정
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// **컴포넌트 내보내기**
export default SiteManagements;
