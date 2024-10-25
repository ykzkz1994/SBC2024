import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getOne} from "../../api/reviewApi";
import {prefix} from "../../api/camperApi";

const ReviewReadComponent = () => {
    const initState = {
        reviewID: 0,
        reviewTitle: '',
        reviewContent: '',
        reviewDate: null,
        reviewAttachment: '',
        rtag_Clean: '',
        rtag_Price: '',
        rtag_Facility: '',
        rtag_Photo: '',
        rtag_Silence: '',
        rtag_Kind: '',
        rtag_View: '',
        member: {}
    }

    const {reviewID} = useParams()
    const navigate = useNavigate()
    const [reviewBoard, setReviewBoard] = useState(initState);
    const [imageLoadError, setImageLoadError] = useState(false);
    const loginState = useSelector((state) => state.loginSlice)


    useEffect(() => {
        getOne(reviewID).then(data => {
            console.log("사진", data.reviewAttachment);
            setReviewBoard(data)
            console.log("ID : ", loginState.member.memberId, "Role : ", loginState.member.memberRole)
        });
    }, [reviewID]);

    // 수정하기 버튼 클릭시 호출되는 함수
    const handleModifyClick = (reviewID) => {
        navigate(`/review/modify/${reviewID}`);
    }

    // 삭제하기 버튼 클릭
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(null);

    const handleDeleteClick = (reviewID) => {
        setCurrentID(reviewID)
        setModalOpen(true);
    }

    // 목록으로 돌아가기 버튼 클릭 시 호출되는 함수
    const handleBackToListClick = () => {
        navigate("/review/list")
    }


    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-400">
            {/* 제목 및 작성 시간 */}
            <div className="flex justify-between items-center mb-8"> {/* 간격을 더 주기 위해 mb-8 적용 */}
                {/* 타이틀 옆에 태그 이름 붙이기 */}
                <h2 className="text-2xl font-bold">{reviewBoard.reviewTitle}</h2>
                <div>
                    <p className="text-gray-500 mb-1">작성일 : {reviewBoard.reviewDate}</p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">작성자 {reviewBoard.member.memberName}</h3>
            </div>

            <div className="mb-8">
                {reviewBoard.reviewAttachment && reviewBoard.reviewAttachment.trim() !== "" && !imageLoadError ? (
                    <div className="text-gray-700 flex justify-center">
                        <img
                            src={`${prefix}/view/${reviewBoard.reviewAttachment}`}
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
                    <p className="text-gray-500"></p>
                )}
            </div>
        </div>


    );
};

export default ReviewReadComponent;