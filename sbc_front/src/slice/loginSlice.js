import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";
import {getCookie, removeCookie, setCookie} from "../util/cookieUtil";

const initState = {
    email: '',
}

// 쿠키로 저장된 로그인 결과 전달
const loadMemberCookie = () => {
    const memberInfo = getCookie("member")
    if(memberInfo && memberInfo.email){
        memberInfo.email = decodeURIComponent(memberInfo.email);
    }
    return memberInfo;
}

// 로그인 API 서버에 요청
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param);
})

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState : loadMemberCookie() || initState, // 쿠키가 없으면 초기값 사용
    reducers : {
        login : (state, action) => {
            const data = action.payload; // 구성요소 : email, pw
            return { email : data.email };
        },
        logout : (state, action) => {
            removeCookie("member") // 쿠키 삭제
            return {...initState}
        }
    },
    // 비동기 호출상태에 따른 동작 (1. fulfilled, 2. pending, 3. rejected)
    extraReducers : (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            // 로그인 완료
            console.log('fulfilled', action.payload);
            const payload = action.payload;
            if(!payload.error){
                console.log('쿠키 저장')
                setCookie("member", JSON.stringify(payload),1); // 쿠키 1일
            }
            return payload;
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending : 처리중")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected : 오류")
        })
    }
})

export const {login, logout} = loginSlice.actions;
export default loginSlice.reducer;
