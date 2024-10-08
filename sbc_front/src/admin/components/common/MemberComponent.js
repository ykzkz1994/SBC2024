import React from 'react';

function MemberComponent(props) {
    return (
        <>
        <div>    
                
        <select id="searchType" name="searchType">
            <option value="name">회원명</option>
            <option value="phone">핸드폰</option>
            <option value="email">이메일</option>
        </select>
    <input id="searchKeyword">
    </input>
    <button>조회</button>
    </div>
    <div>
    <select id="orderType" name="orderType">
            <option value="name">회원명</option>
            <option value="phone">최근 가입일</option>
            <option value="email">최초 가입일</option>
        </select> 
    </div>
    </>
    );
}

export default MemberComponent;



