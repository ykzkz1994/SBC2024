import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";

const initState = {
    email: '',
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param);
})

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState : initState,
    reducers : {
        login : (state, action) => {
            const data = action.payload; // 구성요소 : email, pw
            return { email : data.email };
        },
        logout : (state, action) => {
            return {...initState}
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            // 로그인 완료
            console.log('fulfilled', action.payload);
            const payload = action.payload;
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
