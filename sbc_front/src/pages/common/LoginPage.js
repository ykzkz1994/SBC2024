import BasicLayout from "../../layouts/BasicLayout";
import LoginMenu from "../../layouts/LoginMenu";
import '../../css/login.css'
import {useState} from "react";
import {loginPostAsync} from "../../slice/loginSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const [loginParam, setLoginParams] = useState({email : '',pw : ''})
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;
        setLoginParams({...loginParam});
    }

    const handleClickLogin = (e) => {
        dispatch(loginPostAsync(loginParam)) // loginSlice 비동기 호출
            .unwrap()
            .then(data => {
                console.log('ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', data);
                if(data.error){
                    alert('이메일과 비밀번호를 다시 확인해주세요.')
                } else{
                    alert('로그인 성공')
                    navigate({pathname: '/'}, {replace:true})
                }
            })
    }

    return(
        <BasicLayout>
            <LoginMenu/>
            <div>
                로그인 페이지
            </div>
            <div id="loginwrap">
                <div id="loginbox">
                    <input type="email" name="email" value={loginParam.email} onChange={handleChange} placeholder={" 이메일을 입력해주세요"}></input><br></br>
                    <input type="password" name="pw" value={loginParam.pw} onChange={handleChange} placeholder={" 비밀번호를 입력해주세요."}></input>
                    <div>
                        <button onClick={handleClickLogin}>로그인</button><br></br>
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