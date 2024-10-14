import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getOne} from "../../api/qnaApi";
import defaultImage from '../../../images/default.jpg';

const initState = {
    qboardID : 0,
    qboardViews:0,
    qboardTitle:'',
    member:{},
    qboardDate:null,
    qboardAttachment:'',
    qboardContent: ''
}

function ReadComponent() {
   const {qbID} = useParams()
   const navigate = useNavigate()
   const [qboard, setQboard] = useState(initState);

    useEffect(() => {
        getOne(qbID).then(data => {
            console.log(data);
            setQboard(data)
        })
    }, [qbID]);

    // 수정하기 버튼 클릭 시 호출되는 함수
    const handleModifyClick = (qbID) => {
        navigate(`/qnas/modify/${qbID}`); // 수정 페이지로 이동
    };

    // 삭제하기 버튼 클릭 시 호출되는 함수
    const handleDeleteClick = (qbID) => {
        // 삭제 로직 추가 (예: API 호출)
        console.log(`${qbID}번 공지사항이 삭제되었습니다.`);
        // 삭제 후 목록 페이지로 이동
        navigate('/admin/qnas/list');
    };

    // 목록으로 돌아가기 버튼 클릭 시 호출되는 함수
    const handleBackToListClick = () => {
        navigate('/admin/qnas/list'); // 공지사항 목록 페이지로 이동
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-400">
            {/* 제목 및 작성 시간 */}
            <div className="flex justify-between items-center mb-8"> {/* 간격을 더 주기 위해 mb-8 적용 */}
                <h2 className="text-2xl font-bold">{qboard.qboardTitle}</h2>
                <div>
                    <p className="text-gray-500 mb-1">작성일 : {qboard.qboardDate}</p>
                    <p className="text-gray-500">조회수: {qboard.qboardViews}</p> {/* 조회수 표시 */}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">작성자 {qboard.member.memberName}</h3>
            </div>

            <div className="mb-8">
                <p className="text-gray-700 bg-gray-100 p-4 rounded-lg"><img
                    src={qboard.qboardAttachment}
                    alt="게시물 첨부 이미지"
                    className="rounded-lg"
                    onError={(e) => {
                        e.target.onerror = null; // 무한 루프 방지
                        e.target.src = defaultImage; // 기본 이미지 경로
                    }}
                />
                </p>
            </div>

            <div className="mb-8">
                <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{qboard.qboardContent}</p>
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
                    onClick={() => handleModifyClick(qboard.qboardID)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    수정하기
                </button>
                <button
                    onClick={() => handleDeleteClick(qboard.qboardID)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
}

export default ReadComponent;