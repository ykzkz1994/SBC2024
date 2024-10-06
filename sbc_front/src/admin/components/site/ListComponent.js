// src/admin/components/site/SiteManagements.js

import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const SiteManagements = () => {
    // 구역 정보에 대한 샘플 데이터
    const [sites, setSites] = useState([
        { id: 1, siteName: 'Deck A', reservationLimit: 'N', minPeople: 4, maxPeople: 6, weekdayRate: '50,000', weekendRate: '80,000' },
        { id: 2, siteName: 'Deck B', reservationLimit: 'N', minPeople: 4, maxPeople: 6, weekdayRate: '40,000', weekendRate: '80,000' },
        { id: 3, siteName: 'Deck C', reservationLimit: 'N', minPeople: 4, maxPeople: 6, weekdayRate: '40,000', weekendRate: '80,000' },
        { id: 4, siteName: 'Deck D', reservationLimit: 'Y', minPeople: 4, maxPeople: 6, weekdayRate: '40,000', weekendRate: '80,000' },
    ]);

    return (
        <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">구역 관리</h2>
            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr className="bg-green-200">
                    <th>구역 이름</th>
                    <th>예약 제한</th>
                    <th>기준 인원</th>
                    <th>최대 인원</th>
                    <th>평일 요금</th>
                    <th>주말 요금</th>
                    <th>요금표 설정</th>
                </tr>
                </thead>
                <tbody>
                {sites.map((site) => (
                    <tr key={site.id}>
                        <td>{site.siteName}</td>
                        <td>{site.reservationLimit}</td>
                        <td>{site.minPeople}</td>
                        <td>{site.maxPeople}</td>
                        <td>{site.weekdayRate}</td>
                        <td>{site.weekendRate}</td>
                        <td>
                            <Button variant="secondary" className="w-full mb-2">
                                수정하기
                            </Button>
                            <Button variant="secondary" className="w-full">
                                ▼
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SiteManagements;
