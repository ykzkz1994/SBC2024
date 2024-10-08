// src/admin/components/notice/ModifyComponent.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModifyComponent = () => {
    const { nid } = useParams(); // URL에서 공지사항 ID(nid)를 가져옴
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    // 상태 관리: 공지사항 제목과 내용
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 공지사항 데이터를 가져오는 효과 (샘플 데이터 사용)
    useEffect(() => {
        // 실제로는 API를 통해 nid에 해당하는 공지사항 데이터를 가져와야 함
        const fetchNoticeData = async () => {
            // 샘플 데이터 예시
            const noticeData = {
                title: '공지 1',
                content: '이것은 공지사항 내용입니다.',
            };

            setTitle(noticeData.title);
            setContent(noticeData.content);
        };

        fetchNoticeData();
    }, [nid]);

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // 수정된 데이터를 제출하는 로직 (예: API 호출)
        console.log('수정된 공지사항:', { nid, title, content });

        // 수정 완료 후 공지사항 목록 페이지로 이동
        navigate('/notice/list');
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-400">
            <h2 className="text-2xl font-bold mb-4">공지사항 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="공지사항 제목을 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="5"
                        placeholder="공지사항 내용을 입력하세요"
                        required
                    />
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        수정 완료
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifyComponent;
