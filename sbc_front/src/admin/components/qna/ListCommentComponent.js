import React, { useEffect, useState } from 'react';
import { getCommentList } from '../../api/qnaApi';

const commentStyle = {
    width: '100%',
    height: '100px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius : 5,
    fontsize: 10
};

function ListCommentComponent(props) {
    
    const [serverData, setServerData] = useState([])

    useEffect(()=>{
        getCommentList().then(data=> {
            console.log(data)
            setServerData(data)
        })
    },[]) // 일단 처음 렌더링할 때 나오는걸로

    return (
        <div>
           <div className='list_wrapper'>
                {serverData.map(comm =>
                    <div key={comm.qcommentID} style={commentStyle}>
                        <div>{comm.member.memberName}</div>
                        <div>
                            {comm.qcommentContent}
                        </div>
                        <div>
                            {comm.qcommentDate}
                        </div>
                        </div>
                )}
            </div> 
        </div>
    );
}

export default ListCommentComponent;