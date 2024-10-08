// src/admin/pages/notice/AddPage.js

import React from 'react';
import AddComponent from '../../components/notice/AddComponent';
import ListComponent from "../../components/notice/ListComponent";

const AddPage = () => {
    return (
        <div>
            <h1>공지사항 게시판</h1>
            <AddComponent />
        </div>
    );
};

export default AddPage;
