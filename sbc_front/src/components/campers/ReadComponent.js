import React, { useEffect, useState } from "react";
import { getOne, deleteOne, getMemberById, prefix, getCookieMemberId } from "../../api/camperApi"; // API 함수 가져오기
import useCustomMove from "../../hooks/useCustomMove";
import CommentComponent from "./CommentComponent"; // CommentComponent 추가

const initState = {
    member: {
        memberName: '', // 작성자 이름
        memberID: ''
    },
    cboardCategory: '',
    cboardTitle: '',
    cboardContent: '',
    cboardDate: '',
    cboardViews: 0,
    cboardAttachment: '',
    cboardId: null,
};

const ReadComponent = ({ cBoardId }) => {
    const [camper, setCamper] = useState(initState); // 게시글 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const { moveToList, moveToModify } = useCustomMove(); // 페이지 이동 훅
    const [imageLoadError, setImageLoadError] = useState(false)

    // 게시글 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOne(cBoardId);
                if (data) {
                    setCamper(data); // 게시글 데이터 상태 업데이트


                    // 작성자 정보를 가져오기 위해 memberId를 사용
                    if (data.memberID) {
                        const memberData = await getMemberById(data.memberID);
                        setCamper(prevCamper => ({
                            ...prevCamper,
                            member: memberData
                        }));
                    }
                } else {
                    console.log("데이터가 없습니다.");
                }
            } catch (error) {
                console.error("API 호출 오류:", error);
            } finally {
                setLoading(false);
            }
        };

        console.log("getCookieMemberId : ", getCookieMemberId());
        console.log("checkMemberId : ", camper.member.memberID);

        fetchData();
    }, [cBoardId]);

    // 게시글 삭제 함수
    const handleDelete = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                const response = await deleteOne(cBoardId);
                if (response.res == "F" && response.code == "403") {
                    alert("작성자만 수정할 수 있습니다.");
                    return;
                }
                alert("게시글이 삭제되었습니다.");
                moveToList();
            } catch (error) {
                console.error("삭제 중 오류 발생:", error);
            }
        }
    };

    // 파일이 이미지인지 확인하는 함수
    const isImageFile = (fileName) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']; // 이미지 확장자 목록
        const extension = fileName.split('.').pop().toLowerCase();
        return imageExtensions.includes(extension);
    };

    if (loading) {
        return <div>Loading...</div>; // 로딩 상태 표시
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-400 mb-40">
            {/* 제목 및 작성 시간 */}
            <div className="flex justify-between items-center mb-8"> {/* 간격을 더 주기 위해 mb-8 적용 */}
                <h2 className="text-2xl font-bold">[{camper.cboardCategory}] {camper.cboardTitle}</h2>
                <div>
                    <p className="text-gray-500 mb-1">작성일 _ {camper.cboardDate}</p>
                    <p className="text-gray-500">조회수 _ {camper.cboardViews}</p> {/* 조회수 표시 */}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">작성자
                    _ {camper.member && camper.member.memberName ? camper.member.memberName : '작성자가 없습니다.'}
                </h3>
            </div>

            <div className="mb-8">
                {camper.cboardAttachment && camper.cboardAttachment.trim() !== "" && !imageLoadError ? (
                    <>
                        <span className="text-lg font-semibold">첨부 이미지</span>
                        <div className="text-gray-700 flex justify-center">
                            <img
                                src={`${prefix}/view/${camper.cboardAttachment}`}
                                alt="게시물 첨부 이미지"
                                className="rounded-lg"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: 'auto',
                                    marginBottom: '10px'
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    setImageLoadError(true);
                                }}
                            />
                        </div>
                    </>
                ) : null}
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">내용</h3>
                <textarea
                    name="qBoardContent"
                    value={camper.cboardContent} // qna의 상태를 직접 사용
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    rows="5"
                    readOnly
                />
            </div>

            {/* 댓글 컴포넌트 */}
            <div className="mb-8">
                <hr/>
                <h3 className="text-lg font-semibold mb-2">댓글</h3>
                <CommentComponent cBoardId={cBoardId}/> {/* 댓글 컴포넌트 추가 */}
            </div>

            {/* 버튼 */}
            <div className="text-right space-x-2">
                <button
                    type="button"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={moveToList}
                >
                    목록으로
                </button>
                {getCookieMemberId() === camper.member.memberID && (
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={() => moveToModify(cBoardId)}
                    >
                        수정하기
                    </button>

                )}
                {getCookieMemberId() === camper.member.memberID && (
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        삭제하기
                    </button>

                )}
            </div>
        </div>
)
    ;
};

export default ReadComponent;