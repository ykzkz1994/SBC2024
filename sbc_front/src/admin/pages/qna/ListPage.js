import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ListComponent from '../../components/qna/ListComponent'

function ListPage(props) {

    return (
        <>
        <div>
           Qna List page
        </div>
        <div>
            <ListComponent/>
        </div>
        
        </>
    );
}

export default ListPage;