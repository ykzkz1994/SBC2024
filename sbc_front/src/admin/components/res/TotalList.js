


import {getAllRes} from "../../api/ResApi"; //pk로 멤버 아이디와 구역아이디,예약정보를 가져와서 사용할  메서드
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Search from './Search';
//테이블 헤드 오름차순 내림차순
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // react-icons 임포트



const TotalList = () => {

    //예약목록 전체를 저장 하는 변수 현재는 빈배열 api에서 악시오스로 받아온거 할당할거임
    const [reservations,setReservations] = useState([]);

    //페이지 값 설정하는 코드 초기값은 1로 설정
    const [currentPage, setCurrentPage] = useState(1);
    
    //에러 메세지 상태 설정  디폴트 빈문자열
    const [error,setError] = useState("");

    //한 페이지에 출력할 예약 수 한 페이지당 15개만 출력 예정
    const itemsPerPage = 15;
    //서치에서 사용하는 현재 검색어 상태
    const [searchTerm, setSearchTerm] = useState('');
    //서치에서 선택할 셀렉/옵션
    const [selectedColumn, setSelectedColumn] = useState('reservationNumber');

    //오름차순, 내림차순 상태
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedColumn]);


    //api에서 받아온 함수를  변수에 할당할거임 사용 하러 곳에서 reservation.map(res=>({res.필드명})의 형태로 사용)
    const settingReservations = async ()=>{

        try{//정삭적 작동
            //변수 data에 getAllRes의 Response.data를 비동기식으로 할당
            const data = await getAllRes();
            // 컴포넌트 상단에서 선언한 reservation을 set으로 설정
            setReservations(data);
        }catch (err){//예외처리
            console.error("예약정보를 불러오는데 실패했습니다 TotalList파일-settingReservations함수",err)
            setError("예약정보를 불러오는데 실패했습니다")
        }

    }

    //특정 예약만 추려서 출력하는 filterRes함수
    const filterRes = useState(() => {

        //만약(searchTerm이 비어있다면 reservations를 반환해라)
        //.trim()은 search가 공백열을 제거 했을 때""라면 true를 반환하는데  
        //!가  붙어 부정형이기 때문에 false를 반환 근데 if문은 ture에서 작동하기 때문에
        //비어있다면 예약리스트를 반환하라는 코드가 된다
        if (!searchTerm.trim()) return reservations;

        const escapeRegExp = (string) => string.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
        const regexPattern = escapeRegExp(searchTerm).replace(/\*/g, '.*').replace(/\?/g, '.');

        let regex;

        try {
            regex = new RegExp(regexPattern, 'i');
        } catch (e) {
            console.error('Invalid search pattern:', e);
            return reservations;
        }

        return reservations.filter((reservation) => {
            const field = reservation[selectedColumn];
            return field && regex.test(field);
        });
    }, [reservations, searchTerm, selectedColumn]);

    const sortedReservations = useState(() => {
        if (!sortConfig.key) return filterRes;

        return [...filterRes].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // 결제금액 (totalPay) 컬럼 처리: 문자열을 숫자로 변환
            if (sortConfig.key === 'payment') {
                aValue = parseInt(aValue.replace(/,/g, '').replace('원', ''), 10);
                bValue = parseInt(bValue.replace(/,/g, '').replace('원', ''), 10);
            }

            // 날짜 컬럼 처리
            const dateColumns = ['reservationDate', 'checkInDate', 'checkOutDate', 'cancelDate'];
            if (dateColumns.includes(sortConfig.key)) {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            // 숫자 비교
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // 날짜 비교
            if (aValue instanceof Date && bValue instanceof Date) {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // 문자열 비교 (localeCompare 사용)
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue, 'ko', { sensitivity: 'base' })
                    : bValue.localeCompare(aValue, 'ko', { sensitivity: 'base' });
            }

            return 0;
        });
    }, [filterRes, sortConfig]);

    //페이지네이션처리
    const currentItems = useState(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return sortedReservations.slice(indexOfFirstItem, indexOfLastItem);
    }, [sortedReservations, currentPage, itemsPerPage]);

    const totalPages = useState(() => Math.ceil(sortedReservations.length / itemsPerPage), [sortedReservations.length, itemsPerPage]);

    const startPage = useState(() => Math.floor((currentPage - 1) / 10) * 10 + 1, [currentPage]);
    const endPage = useState(() => Math.min(startPage + 9, totalPages), [startPage, totalPages]);

    const pageNumbers = useState(() => {
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [startPage, endPage]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevGroup = () => { if (startPage > 1) setCurrentPage(startPage - 10); };
    const handleNextGroup = () => { if (endPage < totalPages) setCurrentPage(endPage + 1); };
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };
    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4">예약 완료 리스트</h2>
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
            />
            <Table bordered hover responsive className="text-sm">
                {/*표의 머리부분로우*/}
                <thead>
                <tr>
                    {/* 각 컬럼 헤더에 정렬 기능 추가 */}
                    <th onClick={() => handleSort('resId')} style={{ cursor: 'pointer' }}>
                        예약번호 {renderSortIcon('resId')}
                    </th>
                    <th onClick={() => handleSort('resDate')} style={{ cursor: 'pointer' }}>
                        예약한 날짜 {renderSortIcon('resDate')}
                    </th>
                    <th onClick={() => handleSort('siteId')} style={{ cursor: 'pointer' }}>
                        예약 구역 번호 {renderSortIcon('siteId')}
                    </th>

                    <th onClick={() => handleSort('userName')} style={{ cursor: 'pointer' }}>
                        이용자명 {renderSortIcon('userName')}
                    </th>

                    <th onClick={() => handleSort('userPhone')} style={{ cursor: 'pointer' }}>
                        이용자 전화번호 {renderSortIcon('userPhone')}
                    </th>
                    <th onClick={() => handleSort('checkinDate')} style={{ cursor: 'pointer' }}>
                        입실 날짜 {renderSortIcon('checkinDate')}
                    </th>
                    <th onClick={() => handleSort('checkoutDate')} style={{ cursor: 'pointer' }}>
                        퇴실 날짜 {renderSortIcon('checkoutDate')}
                    </th>
                    <th onClick={() => handleSort('cancelDate')} style={{ cursor: 'pointer' }}>
                        취소 날짜 {renderSortIcon('cancelDate')}
                    </th>
                    <th onClick={() => handleSort('cancelReason')} style={{ cursor: 'pointer' }}>
                        취소 사유 {renderSortIcon('cancelReason')}
                    </th>
                    <th onClick={() => handleSort('totalPay')} style={{ cursor: 'pointer' }}>
                        결제금액 (단위: 원) {renderSortIcon('totalPay')}
                    </th>
                </tr>
                </thead>
                {/*표의 바디부분*/}
                <tbody>
                {reservations.length > 0 ? (
                    reservations.map(reservation => (
                        <tr key={reservations.resId}>
                            <td>{reservations.resId}</td>
                            <td>{reservations.resDate}</td>
                            <td>{reservations.siteId}</td>
                            <td>{reservations.userName}</td>
                            <td>{reservations.userPhone}</td>
                            <td>{reservations.userName}</td>
                            <td>{reservations.userPhone}</td>
                            <td>{reservations.checkinDate}</td>
                            <td>{reservations.checkoutDate}</td>
                            <td>{reservations.cancelDate}</td>
                            <td>{reservations.cancelReason}</td>
                            <td>{reservations.payment}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="12" className="text-center">검색 결과가 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <div className="mt-4 d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${startPage === 1 ? 'disabled' : ''}`}>
                            <Button className="page-link" onClick={handlePrevGroup} disabled={startPage === 1}>
                                &laquo;
                            </Button>
                        </li>
                        {pageNumbers.map((pageNumber) => (
                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                <Button
                                    className="page-link"
                                    onClick={() => handlePageChange(pageNumber)}
                                    style={{
                                        color: currentPage === pageNumber ? 'white' : 'blue',
                                        fontWeight: currentPage === pageNumber ? 'bold' : 'normal',
                                        backgroundColor: currentPage === pageNumber ? 'blue' : 'transparent',
                                        border: 'none'
                                    }}
                                >
                                    {pageNumber}
                                </Button>
                            </li>
                        ))}
                        <li className={`page-item ${endPage === totalPages ? 'disabled' : ''}`}>
                            <Button className="page-link" onClick={handleNextGroup} disabled={endPage === totalPages}>
                                &raquo;
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TotalList;
