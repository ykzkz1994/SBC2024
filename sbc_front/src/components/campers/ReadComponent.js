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
        <div className="container mt-4">
            <div className="border p-4 rounded" style={{maxWidth: "600px", margin: "auto"}}>
                {/* 카테고리와 제목 */}
                <h1>{camper.cboardCategory} - {camper.cboardTitle}</h1>
                <hr/>

                {/* 작성일과 조회수 */}
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <strong>작성일: </strong>{camper.cboardDate}
                    </div>
                    <div className="col-sm-6">
                        <strong>조회수: </strong>{camper.cboardViews}
                    </div>
                </div>
                <hr/>

                {/* 작성자 */}
                <div className="mb-2">
                    <strong>작성자: </strong>
                    {camper.member && camper.member.memberName ? camper.member.memberName : '작성자가 없습니다.'}
                </div>
                <hr/>

                <div className="mb-2">
                    <strong>첨부파일: </strong>
                    {camper.cboardAttachment ? (
                        isImageFile(camper.cboardAttachment) ? (
                            // 이미지 파일인 경우 표시
                            <img
                                src={`${prefix}/view/${camper.cboardAttachment}`}
                                alt="첨부 이미지"
                                style={{maxWidth: '100%', height: 'auto', marginBottom: '10px'}}
                            />
                        ) : (
                            // 일반 파일의 경우 다운로드 링크 제공
                            <a
                                href={`/api/campers/files/${camper.cboardAttachment}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                첨부파일 보기
                            </a>
                        )
                    ) : (
                        <span>없음</span>
                    )}
                </div>
                {/*{camper.cboardAttachment && camper.cboardAttachment.trim() !== "" && !imageLoadError ? (*/}
                {/*    <div className="text-gray-700 flex justify-center">*/}
                {/*        <img*/}
                {/*            src={`${prefix}/view/${camper.cboardAttachment}`}*/}
                {/*            alt="게시물 첨부 이미지"*/}
                {/*            className="rounded-lg"*/}
                {/*            style={{*/}
                {/*                width: '100%', // 원하는 비율에 맞게 설정*/}
                {/*                maxWidth: '500px', // 최대 너비 설정*/}
                {/*                height: 'auto', // 비율을 유지하며 높이 자동 조정*/}
                {/*            }}*/}
                {/*            onError={(e) => {*/}
                {/*                e.target.onerror = null; // 무한 루프 방지*/}
                {/*                setImageLoadError(true); // 새로운 상태 변수를 사용하여 이미지 로드 실패를 추적*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <p className="text-gray-500"></p>*/}
                {/*)}*/}
                <hr />

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-2">내용</h3>
                    <textarea className="form-control text-gray-700 bg-gray-100 p-4 rounded-lg" readOnly
                              rows="6">{camper.cboardContent}</textarea>
                </div>

                {/* 댓글 컴포넌트 */}
                <div>
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
        </div>
    );
};

export default ReadComponent;