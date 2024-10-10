// src/admin/components/notice/ReadComponent.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReadComponent = () => {
    const { nid } = useParams(); // URL에서 공지사항 ID를 가져옴
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    // 상태 관리: 공지사항 제목, 내용, 작성 시간, 조회수
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState(null); // 작성 시간
    const [views, setViews] = useState(0); // 조회수

    // 공지사항 데이터를 가져오는 효과 (샘플 데이터 사용)
    useEffect(() => {
        // 실제로는 API를 통해 nid에 해당하는 공지사항 데이터를 가져와야 함
        const fetchNoticeData = async () => {
            // 샘플 데이터 예시
            const noticeData = {
                title: '공지 1',
                content: '이것은 공지사항 내용입니다.',
                createdAt: '2024-10-07 10:30:00', // 작성 시간을 샘플로 추가
                views: 123, // 조회수 샘플 데이터
            };

            setTitle(noticeData.title);
            setContent(noticeData.content);
            setCreatedAt(noticeData.createdAt);
            setViews(noticeData.views); // 조회수 설정
        };

        fetchNoticeData();
    }, [nid]);

    // 수정하기 버튼 클릭 시 호출되는 함수
    const handleModifyClick = () => {
        navigate(`/notice/modify/${nid}`); // 수정 페이지로 이동
    };

    // 삭제하기 버튼 클릭 시 호출되는 함수
    const handleDeleteClick = () => {
        // 삭제 로직 추가 (예: API 호출)
        console.log(`${nid}번 공지사항이 삭제되었습니다.`);
        // 삭제 후 목록 페이지로 이동
        navigate('/notices/list');
    };

    // 목록으로 돌아가기 버튼 클릭 시 호출되는 함수
    const handleBackToListClick = () => {
        navigate('/notices/list'); // 공지사항 목록 페이지로 이동
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-400">
            {/* 제목 및 작성 시간 */}
            <div className="flex justify-between items-center mb-8"> {/* 간격을 더 주기 위해 mb-8 적용 */}
                <h2 className="text-2xl font-bold">공지사항 #{nid}</h2> {/* 글 번호 표시 */}
                <div>
                    <p className="text-gray-500 mb-1">작성 시간: {createdAt ? createdAt : 'N/A'}</p>
                    <p className="text-gray-500">조회수: {views}</p> {/* 조회수 표시 */}
                </div>
            </div>

            {/* 공지사항 제목 영역 */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">제목</h3> {/* '제목' 텍스트 추가 */}
                <p className="text-xl font-bold">{title}</p>
            </div>

            {/* 공지사항 내용 표시 영역 */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">공지 내용</h3> {/* '공지 내용' 텍스트 추가 */}
                <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{content}</p>
            </div>

            {/* 목록으로 돌아가기, 수정하기, 삭제하기 버튼 */}
            <div className="text-right space-x-2">
                <button
                    onClick={handleBackToListClick}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                    목록으로
                </button>
                <button
                    onClick={handleModifyClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    수정하기
                </button>
                <button
                    onClick={handleDeleteClick}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
};

export default ReadComponent;
