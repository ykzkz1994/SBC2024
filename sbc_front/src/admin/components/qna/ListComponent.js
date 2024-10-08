// 서버의 데이터에는 dtoList라는 배열 데이터와 pageNumList라는 페이지 번호들이 있고, 이전/다음 등의 추가적인 데이터들이 있다.

import useCustomMove from '../../hooks/useCustomMove';
import {useEffect, useState} from 'react';
import { getList } from '../../api/qnaApi';

const initState = {
    dtoList:[],
    pageNumList:[],
    pageRequestDTO : null,
    prev : false,
    next: false,
    totalCount: 0,
    prevPage : 0,
    nextPage : 0,
    totalPage : 0,
    current : 0
}

function ListComponent(props) {
    
    const {page, size} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    useEffect(()=>{

        getList({page,size}).then(data=> {
            console.log(data)
            setServerData(data)
        })
    }, [page,size])
    
    return (
        <div>
            <div>문의 게시판</div>
            <table>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                    <th>답변상태</th>
                </tr>
                {serverData.dtoList.map(qb => 
                <tr key={qb.qboardID}>
                    <td>{qb.qboardID}</td>
                    <td>{qb.qboardTitle}</td>
                    <td>{qb.member.memberName}</td>
                    <td>{qb.qboardViews}</td>
                    {qb.qboardAsked.trim().toUpperCase() === "Y" ? (<td>미답변</td>) : (<td>답변완료</td>)}
                </tr>
            )}
            </table>
            <button>글쓰기</button>

            <div>    
                
        <select id="searchType" name="searchType">
            <option value="title">제목</option>
            <option value="content">내용</option>
        </select>
    <input id="searchKeyword" placeholder='검색어를 입력해주세요'>
    </input>
    <button>검색</button>
    </div>

        </div>
    );
}

export default ListComponent;