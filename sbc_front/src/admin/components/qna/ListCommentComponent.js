import React, { useEffect, useState } from 'react';
import { getCommentList } from '../../api/qnaApi';

const initState = {
    dtoList :[]
}


function ListCommentComponent(props) {
    
    const [serverData, setServerData] = useState(initState)

    useEffect(()=>{
        getCommentList().then(data=> {
            console.log(data)
            setServerData(data)
        })
    })

    return (
        <div>
           <div className='list_wrapper'>
                {serverData.dtoList.map(comm => 
                    <div key={comm.qcommentID}>
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