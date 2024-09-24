import BasicLayout from "../../layouts/BasicLayout";
import LoginMenu from "../../layouts/LoginMenu";
import '../../css/login.css'

const LoginPage = () => {
    return(
        <BasicLayout>
            <LoginMenu/>
            <div>
                로그인 페이지
            </div>
            <div id="loginwrap">
                <div id="loginbox">
                    <input type="email" name="email"></input><br></br>
                    <input type="password" name="pw"></input>
                    <div>
                        <button>로그인</button><br></br>
                        <button>카카오로그인</button>
                    </div>
                </div>
                <div>
                    <button>이메일찾기</button>
                    <button>비밀번호찾기</button>
                </div>
            </div>
            
        </BasicLayout>
    );
}

export default LoginPage;