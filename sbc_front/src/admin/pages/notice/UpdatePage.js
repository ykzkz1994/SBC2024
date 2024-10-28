// src/admin/pages/notice/UpdatePage.js

import React from 'react';
import UpdateComponent from '../../components/notice/UpdateComponent';

const UpdatePage = () => {
    return (
        <div>
            <a href={"/admin/notices/list"} style={{textDecoration: 'none', color: 'black'}}>
                <h1>공지사항 게시판</h1>
            </a>
            <UpdateComponent/>
        </div>
    );
};

export default UpdatePage;
