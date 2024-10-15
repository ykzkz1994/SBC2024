import BasicLayout from "../../layouts/BasicLayout";
import LoginMenu from "../../layouts/LoginMenu";
import {useState} from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const FindPwPage = () => {

    const [loginParam, setLoginParams] = useState({name : '',email : ''})
    const { moveToPath } = useCustomLogin()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;
        setLoginParams({...loginParam});
    }

    const handleChangePw = (e) => {
        console.log(loginParam);
    }


    return(
        <BasicLayout>
            <LoginMenu/>
            <div id="loginwrap">
                <div>
                    <h3>비밀번호 찾기</h3>
                </div>
                <div id="loginbox">
                    <input type="text"
                           name="memberName"
                           value={loginParam.name}
                           onChange={handleChange}
                           placeholder={" 이름을 입력해주세요"}></input><br></br>
                    <input type="eamil"
                           name="memberEmail"
                           value={loginParam.email}
                           onChange={handleChange}
                           placeholder={" 이메일을 입력해주세요."}></input>
                    <div>
                        <button onClick={handleChangePw} className={"loginbutton_default"}>비밀번호 변경</button>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default FindPwPage;