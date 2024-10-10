import useCustomMove from '../../../hooks/useCustomMove';
import {useEffect, useState} from 'react';
import { getInactiveList } from '../../api/A_memberApi';
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

function InactiveListComponent() {
    
    const {page, size} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    useEffect(()=>{

        getInactiveList({page,size}).then(data=> {
            console.log(data)
            setServerData(data)
        })
    }, [page,size])
    
    return (
        <div>
            <div>
            <p>휴면 회원 리스트 </p> 
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
                </tr>
            )}
            
            </table>  
        </div>
    );
}

export default InactiveListComponent;