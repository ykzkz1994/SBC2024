// 서버의 데이터에는 dtoList라는 배열 데이터와 pageNumList라는 페이지 번호들이 있고, 이전/다음 등의 추가적인 데이터들이 있다.

import useCustomMove from '../../../hooks/useCustomMove';
import React, {useEffect, useState} from 'react';
import { getFullList } from '../../api/A_memberApi';
import PageComponent from '../../../components/common/PageComponent';
import MemberComponent from './MemberComponent';

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

function TotalListComponent(props) {
    
    const {page, size, moveToList} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    useEffect(()=>{

        getFullList({page,size}).then(data=> {
            console.log(data)
            setServerData(data)
        })
    }, [page,size])
    
    return (
        <div>
            <div>
                <p>전체 회원 리스트 </p>
                <MemberComponent/>
            </div>
            <table>
                <tr>
                    <th>회원번호</th>
                    <th>이메일</th>
                    <th>이름</th>
                    <th>핸드폰 번호</th>
                    <th>성별</th>
                    <th>생년월일</th>
                    <th>지역</th>
                    <th>가입일</th>
                    <th>휴면회원여부</th>
                </tr>
                {serverData.dtoList.map(member =>
                    <tr key={member.memberID}>
                        <td>{member.memberID}</td>
                        <td>{member.memberEmail}</td>
                        <td>{member.memberName}</td>
                        <td>{member.memberPhone}</td>
                        <td>{member.memberGender}</td>
                        <td>{member.memberBirth}</td>
                        <td>{member.memberLocal}</td>
                        <td>{member.memberRegDate}</td>
                        {member.memberStatus.trim().toUpperCase() === "ON" ? (<td></td>) : (<td>휴면</td>)}
                    </tr>
                )}

            </table>
            {/*<PageComponent serverData={serverData} movePage={'#'}></PageComponent>*/}
        </div>
    );
}


export default TotalListComponent;