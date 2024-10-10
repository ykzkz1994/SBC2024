// src/admin/components/notice/AddComponent.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddComponent = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    // 상태 관리: 공지사항 제목과 내용
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        // 입력 필드 검증
        if (title.trim() === '' || content.trim() === '') {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }

        // 제출 로직 (예: API 호출)
        console.log('공지사항 추가:', { title, content });

        // 입력 필드 초기화
        setTitle('');
        setContent('');

        // 작성 완료 후 공지사항 목록 페이지로 이동
        navigate('admin/notices/list');
    };

    // 목록으로 버튼 클릭 핸들러
    const handleBackToList = () => {
        navigate('admin/notices/list');
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-400">
            <h2 className="text-2xl font-bold mb-4">공지사항 추가</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">공지 제목</label>
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
                    <label className="block text-gray-700">공지 내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="5"
                        placeholder="공지사항 내용을 입력하세요"
                        required
                    />
                </div>
                <div className="text-right space-x-2">
                    <button
                        type="button"
                        onClick={handleBackToList}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                        목록으로
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddComponent;
