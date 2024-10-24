import BasicLayout from '../layouts/BasicLayout';
import '../css/mainPage.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import useCustomLogin from "../../hooks/useCustomLogin";

const MainPage = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const { isLogin } = useCustomLogin();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [debugInfo, setDebugInfo] = useState({});

    useEffect(() => {
        console.log("Current login state:", loginState);
        console.log("Is logged in:", isLogin);

        setDebugInfo({
            isLogin,
            memberRole: loginState.member?.memberRole,
            loginStateDetails: JSON.stringify(loginState, null, 2)
        });

        if (isLogin) {
            if (loginState.member?.memberRole === "ROLE_ADMIN") {
                setIsLoading(false);
                console.log("Admin access granted");
            } else {
                console.log("Redirecting to home: Not an admin");
                navigate('/');
            }
        } else {
            console.log("Not logged in, redirecting to login page");
            const timer = setTimeout(() => {
                navigate('/login');
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isLogin, loginState, navigate]);

    if (isLoading) {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ fontSize: '1.5rem', height: '100vh' }}>
                <Spinner animation="border" role="status" className="mb-3" />
                <div>관리자 권한이 필요한 페이지입니다. 로그인 화면으로 이동합니다.</div>
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </Container>
        );
    }

    return (
        <BasicLayout>
            <div id='communitywrap' className='m-5'>
                <h2>관리자 페이지</h2>
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                <div id='guidebox' className='p-2'>
                    <div id='guidewrap' className='m-1'>
                        캘린더 예약 현황
                    </div>
                </div>
                <div id='guidebox' className='p-2'>
                    <div id='guidewrap' className='m-1'>
                        매출 통계
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default MainPage;