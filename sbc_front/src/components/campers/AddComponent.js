import { useState, useEffect } from "react";
import { postAdd, getMemberById } from "../../api/camperApi"; // 회원 정보를 가져오는 API 추가
import useCustomMove from "../../hooks/useCustomMove";

// 초기 상태 설정
const initState = {
    member: {
        memberId: '', // 회원번호
        memberName: '', // 회원 이름 (로그인 또는 회원 번호 입력 시 변경됨)
    },
    cboardCategory: '',
    cboardTitle: '',
    cboardContent: '',
    cboardDate: '',
    cboardViews: 0,
    cboardAttachments: [],
    cboardId: '', // 고정된 ID
};

const AddComponent = () => {
    const [todo, setTodo] = useState({ ...initState });

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // yyyy-mm-dd 형식
        setTodo((prev) => ({ ...prev, cboardDate: currentDate }));
    }, []);

    const { moveToList } = useCustomMove();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // 선택한 파일들
        if (files.length > 2) {
            alert("첨부파일은 최대 2개까지 선택할 수 있습니다.");
            return;
        }
        setTodo((prev) => ({
            ...prev,
            cboardAttachments: files // 파일 배열 업데이트
        }));
    };

    const handleChangeTodo = async (e) => {
        const { name, value } = e.target;

        if (name === "memberId") {
            // memberId 업데이트
            setTodo((prev) => ({
                ...prev,
                member: {
                    ...prev.member,
                    memberId: value,
                },
            }));

            // memberId가 입력되면 해당 회원의 이름을 가져옴
            if (value) {
                try {
                    const memberData = await getMemberById(value);
                    if (memberData) {
                        setTodo((prev) => ({
                            ...prev,
                            member: {
                                ...prev.member,
                                memberName: memberData.memberName, // 가져온 회원 이름 설정
                            },
                        }));
                    } else {
                        setTodo((prev) => ({
                            ...prev,
                            member: {
                                ...prev.member,
                                memberName: "작성자가 없습니다.", // 회원 정보를 못 찾았을 때
                            },
                        }));
                    }
                } catch (error) {
                    console.error("회원 이름을 가져오는 중 오류:", error);
                }
            }
        } else {
            setTodo((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleClickAdd = () => {
        const camperObj = {
            memberId: todo.member.memberId,
            cboardCategory: todo.cboardCategory,
            cboardTitle: todo.cboardTitle,
            cboardContent: todo.cboardContent,
        };

        postAdd(camperObj)
            .then(result => {
                console.log("서버 응답:", result);
                moveToList(); // 추가 완료 후 리스트 페이지로 이동
            })
            .catch(e => {
                console.error("API 호출 오류:", e);
            });
    };

    return (
        <div className="border border-primary mt-4 p-4">
            <div className="mb-3">
                {/* 수동으로 memberId 입력 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">회원 번호</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="memberId"
                            type="text"
                            value={todo.member.memberId}
                            onChange={handleChangeTodo}
                            placeholder="회원번호를 입력하세요"
                        />
                    </div>
                </div>


                {/* 나머지 필드들 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">카테고리</label>
                    <div className="col-sm-10">
                        <select
                            className="form-select"
                            name="cboardCategory"
                            value={todo.cboardCategory}
                            onChange={handleChangeTodo}
                        >
                            <option value="">카테고리를 선택하세요</option>
                            <option value="잡담">잡담</option>
                            <option value="정보">정보</option>
                        </select>
                    </div>
                </div>

                {/* 제목, 첨부파일, 내용 등 추가 필드 */}
                {/* 제목 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">제목</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="cboardTitle"
                            type="text"
                            value={todo.cboardTitle}
                            onChange={handleChangeTodo}
                        />
                    </div>
                </div>

                {/* 첨부파일 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">첨부파일</label>
                    <div className="col-sm-10">
                        <input
                            type="file"
                            className="form-control"
                            name="cboardAttachments"
                            onChange={handleFileChange}
                            multiple
                        />
                    </div>
                </div>

                {/* 내용 */}
                <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">내용</label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            name="cboardContent"
                            value={todo.cboardContent}
                            onChange={handleChangeTodo}
                            rows="4"
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClickAdd}
                >
                    추가
                </button>
            </div>
        </div>
    );
};

export default AddComponent;
