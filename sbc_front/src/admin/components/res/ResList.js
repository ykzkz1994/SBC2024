

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllRes } from '../../api/ResApi';
import Search from "./Search";   //api 임포트
import {getPagination} from "item-pagination";


const ResList = () => {
    // 예약 데이터를 저장하는 변수
    const [reservations, setReservations] = useState([]);

    // 에러 문구 세팅 변수
    const [error, setError] = useState('');

    //자식인 서치컴포넌트에서
    //  onChange={(e) => setSearchTerm(e.target.value)} 이런식으로 값이 변경되면 해당 밸류를 부모에 할당
    // 검색어 상태 변수
    const [searchTerm, setSearchTerm] = useState('');


    // 선택된 컬럼 상태 변수 , 셀렉값의 기본은 예약번호
    const [selectedColumn, setSelectedColumn] = useState('resId');



    //현재 페이지 설정 상태변수
    const [currentPage, setCurrentPage] = useState(1); // 페이지 상태를 1로 초기화
    const itemsPerPage = 15; // 페이지당 항목 수
    // 전체 페이지 수 계산
    const totalPages = Math.ceil(reservations.length / itemsPerPage);
//현재 페이지 변경 함수
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 데이터 불러오는 비동기 함수
    const settingReservation = async () => {
        try {
            //변수 data에 getAllRes의 Responce.data를 할당
            const data = await getAllRes();
            //set 생성자(변수)
            setReservations(data);
        } catch (err) {
            console.error('공지글 데이터를 불러오는데 실패했습니다 TotalList파일 settingReservation함수:', err);
            setError('사이트 데이터를 불러오는데 실패했습니다.');
        }
    };
    // useEffect를 사용하여 컴포넌트 마운트 시 데이터 불러오기
    useEffect(() => {
        settingReservation();
    }, []);

    // 검색어와 선택된 컬럼에 따라 필터링된 예약 데이터 할당
    const filteredReservations = getPagination(reservations).filter((reservation) => {

        // resStatus가 "예약완료"가 아닌 경우 제외
        if (reservation.resStatus !== "예약완료") return false;

        //검색어가 없다면 true를 반환해서 필터링 되지 않은 데이터를 출력
        if (!searchTerm) return true;

        // 선택된 컬럼의 값을 문자열로 변환하고 소문자로 변경하여 대소문자를 구분하지 않도록 함
        //밸류를 문자열로 바꾼후 LowerCase를 적용시킴
        const value = reservation[selectedColumn]?.toString().toLowerCase();

        // 검색어를 소문자로 변환하고, 해당 값에 검색어가 포함되어 있는지 확인
        // value.includes(searchTerm을 소문자로 변경한 값) - 포함된 것만 반환
        return value?.includes(searchTerm.toLowerCase());


    });


    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* **페이지 제목** */}
            <h2 className="text-2xl font-bold mb-4">예약 정보 목록</h2>

            {/* 서치 컴포넌트(자식) */}
            <Search
                searchTerm={searchTerm} //
                setSearchTerm={setSearchTerm}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
            />

            {/* **에러 메시지 표시** */}
            {error && <div className="text-danger mb-4">{error}</div>}

            {/* **예약 정보 테이블** */}
            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr className="bg-blue-200">
                    <th>예약 번호</th>
                    <th>예약자 이름</th>
                    <th>예약자 전화번호</th>
                    <th>인원수</th>
                    <th>입실 날짜</th>
                    <th>퇴실 날짜</th>
                    <th>예약 날짜</th>
                    <th>총 결제 금액</th>
                    <th>회원 ID</th>
                    <th>구역 ID</th>
                </tr>
                </thead>

                <tbody>

                {filteredReservations.length > 0 ? (
                    filteredReservations.map(reservation => (
                        <tr key={reservation.resId}>
                            <td>{reservation.resId}</td>
                            <td>{reservation.resUserName}</td>
                            <td>{reservation.resUserPhone}</td>
                            <td>{reservation.resPeople}</td>
                            <td>{reservation.checkinDate}</td>
                            <td>{reservation.checkoutDate}</td>
                            <td>{reservation.resDate}</td>
                            <td>{reservation.resTotalPay} 원</td>
                            <td>{reservation.member.memberName}</td>
                            <td>{reservation.site.siteName}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="14" className="text-center">예약 데이터가 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </Table>

            {/* 페이지네이션 */}
            <div className="mt-4 text-center">
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    &lt;
                </button>

                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page + 1}
                        onClick={() => handlePageClick(page + 1)}
                        className={`px-4 py-2 mx-1 ${currentPage === page + 1 ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded hover:bg-blue-700`}
                    >
                        {page + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    &gt;
                </button>
            </div>

        </div>
    );
};

// **컴포넌트 내보내기**
export default ResList;
