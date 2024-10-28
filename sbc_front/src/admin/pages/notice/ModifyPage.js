// src/admin/pages/notice/ModifyPage.js

import React from 'react';
import UpdateComponent from '../../components/notice/UpdateComponent';

const ModifyPage = () => {
    return (
        <div>
            <a href={"/admin/notices/list"} style={{textDecoration: 'none', color: 'black'}}>
            </a>
            <UpdateComponent/>
        </div>
    );
};

export default ModifyPage;
