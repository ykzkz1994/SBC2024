import BasicLayout from '../layouts/BasicLayout';
import '../css/mainPage.css';
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import ResCalendar from "../components/res/ResCalendar";

const MainPage = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const { isLogin } = useCustomLogin();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 로그인 상태와 권한을 체크
        if (isLogin && loginState.member.memberRole === "ROLE_ADMIN") {
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => {
                navigate('/'); // React Router로 리디렉션
            }, 1500); // 1.5초 후 리디렉션

            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [isLogin, loginState.member.memberRole, navigate]);

    // 로딩 중이거나 관리자 권한이 없는 경우 메시지 출력
    if (isLoading) {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ fontSize: '1.5rem', height: '100vh' }}>
                <Spinner animation="border" role="status" className="mb-3" />
                <div>관리자 권한 확인 중...</div>
            </Container>
        );
    }

    // 관리자 권한이 있을 때, 여기에 실제 관리자 페이지 내용을 렌더링
    return (
        <>
            {/*로고랑 컴포넌트 사이에 여백을 조금 넣을까 했는데 그리드셀에 내용 들어가면 밑으로 달력이 길어져서 너무 페이지가 길어질 것 같아요*/}
            <BasicLayout>
                {/* 메인컨텐츠 */}
                <div id='communitywrap' className='m-100 border-0'>
                    <div id='guidebox' className='p-20000 border-0'>
                        <div id='guidewrap' className='m-600 border-4 h-100 round-10 shadow-cyan-50'>
                            <ResCalendar/>
                        </div>
                    </div>
                    <div id='guidebox' className='p-2 border-0'>
                        <div id='guidewrap' className='m-1 border-0'>
                            매출 통계 여기에 넣으시면 됩니다
                        </div>
                    </div>
                </div>

            </BasicLayout>
        </>
    );
};

export default MainPage;