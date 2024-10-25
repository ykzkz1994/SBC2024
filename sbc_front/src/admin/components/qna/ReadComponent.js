import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {deleteOne, getOne} from "../../api/qnaApi";
import defaultImage from '../../../images/default.jpg';
import ConfirmModal from "../util/ConfirmModal";
import CommentComponent from "./CommentComponent";
import {prefix} from "../../../api/camperApi";
import {useSelector} from "react-redux";

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
   const [imageLoadError, setImageLoadError] = useState(false);
    const loginState = useSelector((state) => state.loginSlice)

    useEffect(() => {
        getOne(qbID).then(data => {
            console.log("사진", data.qboardAttachment);
            setQboard(data)
            console.log("ID : ", loginState.member.memberId, "Role : ", loginState.member.memberRole)
        });
    }, [qbID]);


    // 수정하기 버튼 클릭 시 호출되는 함수
    const handleModifyClick = (qbID) => {
        if (loginState.member.memberRole === "ROLE_ADMIN") {
            navigate(`/admin/qnas/modify/${qbID}`);
        } else {
            navigate(`/qna/modify/${qbID}`);
        }
    };

    // 삭제하기 버튼 클릭 시 호출되는 함수
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(null);

    const handleDeleteClick = (qbID) => {
        setCurrentID(qbID);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteOne(currentID);
            console.log(`${currentID}번 삭제되었습니다.`);
            if (loginState.member.memberRole === "ROLE_ADMIN") {
                navigate('/admin/qnas/list');
            } else {
                navigate("/qna/list");
            }
        } catch (error) {
            alert("삭제 실패: " + error.message);
            console.error("삭제 중 오류 발생:", error);
        } finally {
            setModalOpen(false); // 작업 후 모달 닫기
        }
    };

    // 목록으로 돌아가기 버튼 클릭 시 호출되는 함수
    const handleBackToListClick = () => {
        if (loginState.member.memberRole === "ROLE_ADMIN") {
            navigate('/admin/qnas/list');
        } else {
            navigate("/qna/list");
        }
        console.log("이거 왜 안보임?")
        console.log("ID:", qboard.qboardID);
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
            {qboard.qboardAttachment && qboard.qboardAttachment.trim() !== "" && !imageLoadError ? (
                    <div className="text-gray-700 flex justify-center">
                        <img
                            src={`${prefix}/view/${qboard.qboardAttachment}`}
                            alt="게시물 첨부 이미지"
                            className="rounded-lg"
                            style={{
                                width: '100%', // 원하는 비율에 맞게 설정
                                maxWidth: '500px', // 최대 너비 설정
                                height: 'auto', // 비율을 유지하며 높이 자동 조정
                            }}
                            onError={(e) => {
                                e.target.onerror = null; // 무한 루프 방지
                                setImageLoadError(true); // 새로운 상태 변수를 사용하여 이미지 로드 실패를 추적
                            }}
                        />
                    </div>
            ) : (
                 <p className="text-gray-500"></p>)}
                </div>

            <div className="mb-8">
                <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{qboard.qboardContent}</p>
            </div>

            <div>
                <hr/>
                <label className="block text-gray-700">댓글</label>

                <CommentComponent/>

            </div>

            {/* 목록으로 돌아가기, 수정하기, 삭제하기 버튼 */}
            <div className="text-right space-x-2">
                <button
                    onClick={handleBackToListClick}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                    목록으로
                </button>

                    {loginState.member.memberRole === "ROLE_ADMIN" && (
                        <>
                            {/* 관리자는 항상 삭제 버튼을 볼 수 있고, 수정 버튼은 자신이 쓴 글만 */}
                            {loginState.member.memberId === qboard.member.memberID && (
                                <button
                                    onClick={() => handleModifyClick(qboard.qboardID)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    수정하기
                                </button>
                            )}
                            <button
                                onClick={() => handleDeleteClick(qboard.qboardID)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                삭제하기
                            </button>
                        </>
                    )}

                    {loginState.member.memberRole !== "ROLE_ADMIN" && loginState.member.memberId === qboard.member.memberID && (
                        <>
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
                        </>
                    )}
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
                title="삭제 확인"
                message="정말 삭제하시겠습니까?"
            />
        </div>
    );
}

export default ReadComponent;