import BasicLayout from "../../layouts/BasicLayout";
import LoginMenu from "../../layouts/LoginMenu";
import {useState} from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import '../../css/login.css'
import {findEmail} from "../../api/memberApi";


const FindEmailPage = () => {

    /* 기능 작업 해야 함 */

    const [member, setMembers] = useState({memberName : '', memberPhone : ''})
    const { moveToPath } = useCustomLogin()

    const handleChange = (e) => {
        setMembers({ ...member, [e.target.name]: e.target.value });
    }

    // '이메일 찾기' 버튼 눌렀을 때 동작 (핸드폰 번호 유효성 확인)
    const handleSubmit = (e) => {
        console.log("확인 : ", member);
        e.preventDefault();

        // 핸드폰번호가 숫자 값으로만 되어있는지 확인
        if(member.memberPhone){
            const phone = member.memberPhone;
            const regExp = /^[\d]*$/;
            if(!(regExp.test(phone))){
                alert('핸드폰번호를 확인해주세요');
                e.preventDefault();
            } else{
                // 이상 없으면 이메일 찾기 실행
                handleFindEmailByNameAndPhone(member);
            }
        }
    }

    // 이메일 찾기 API 요청
    const handleFindEmailByNameAndPhone = async (member) => {
        try {
            const action = await findEmail(member);
            console.log(action);
            if(action.error){
                console.log('이메일 찾기 에러')
            } else {
                console.log(action.data);
            }
        } catch (error) {
            console.log('서버 요청 실패')
        }
    }



    return(
        <BasicLayout>
            <LoginMenu/>
            <div id="loginwrap">
                <div>
                    <h3>이메일 찾기</h3>
                </div>
                <div id="loginbox">
                    <input type="text"
                           name="memberName"
                           value={member.memberName}
                           onChange={handleChange}
                           placeholder={" 이름을 입력해주세요"}></input><br></br>
                    <input type="text"
                           name="memberPhone"
                           value={member.memberPhone}
                           minLength={'11'}
                           maxLength={'11'}
                           onChange={handleChange}
                           style={{fontSize:'14px'}}
                           placeholder={" 핸드폰 번호를 입력해주세요. (-없이 숫자만)"}></input>
                    <div>
                        <button onClick={handleSubmit} className={"loginbutton_default"}>이메일 찾기</button>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default FindEmailPage;