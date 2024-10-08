import React from 'react';
import ReadComponent from '../../components/qna/ReadComponent'
import ListCommentComponent from './../../components/qna/ListCommentComponent';
import AddCommentComponent from '../../components/qna/AddCommentComponent';
import {useParams} from "react-router-dom";


function ReadPage() {
    const {qbID} = useParams()

    return (
        <div>
            Qna Read Page
            <div>
                {qbID} <ReadComponent/>
            </div>

            <div className="comment_wrapper">
                <div>댓글</div>
                <ListCommentComponent/>
                <AddCommentComponent/>

            </div>
            
        </div>
    );
}

export default ReadPage;