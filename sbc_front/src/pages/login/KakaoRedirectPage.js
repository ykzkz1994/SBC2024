import {useNavigate, useSearchParams} from "react-router-dom";
import {retry} from "@reduxjs/toolkit/query";
import BasicLayout from "../../layouts/BasicLayout";
import {useEffect} from "react";
import {getKakaoAccessToken, getMemberWithAccessToken} from "../../api/memberApi";
import {useDispatch} from "react-redux";
import {login} from "../../slice/loginSlice";

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getKakaoAccessToken(authCode).then(accessToken => {
            console.log(accessToken)
            getMemberWithAccessToken(accessToken).then(data => {
                console.log('kakao : ', data)
                const action = data;
                if (action.res == "fail"){
                    navigate(`/join/input?kakaoEmail=${action.kakaoEmail}`)
                } else if (action.res == "success"){
                    dispatch(login(action))
                    navigate(`/`)
                }
            }).catch(err => console.log(err))
        });
    }, [authCode])

    return (
        <BasicLayout>
            <div>
                Kakao Login Redirect Page
            </div>
        </BasicLayout>
    );
}

export default KakaoRedirectPage;