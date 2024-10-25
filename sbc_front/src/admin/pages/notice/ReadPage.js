// src/admin/pages/notice/ReadPage.js

import React from 'react';
import ReadComponent from '../../components/notice/ReadComponent';
import NoticeMoveCompornent from "../../components/notice/NoticeMoveCompornent";


const ReadPage = () => {
    return (
        <div>
            <a href={"/admin/notices/list"} style={{textDecoration: 'none', color: 'black'}}>
                <h1>공지사항 게시판</h1>
            </a>
            {/*상세페이지 랜더링*/}
            <ReadComponent/>
{/*            <NoticeMoveCompornent/>나중에 공부해보기*/}
        </div>
    );
};

export default ReadPage;
