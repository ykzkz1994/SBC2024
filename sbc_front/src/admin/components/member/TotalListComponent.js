import { useEffect, useState } from "react";
import { getList } from "../../api/memberApi";

const initState = {
        memberID : 0,
        memberEmail : '',
        memberName: "",
        memberPhone: "",
        memberGender: "",
        memberBirth: null,
        memberLocal: "",
        memberRegDate: null,
        memberStatus: "",
        memberRole: ""
}

const TotalListComponent = () => {

    const [member, setMember] = useState(initState)

    useEffect(()=>{
        getList().then(data => {
            console.log(data)
            setMember(data)
        })
    })

    const makeLi = (data) => {
        for (let i = 0; i < data.length; i++) {
           console.log(data[i].memberID)
           return data[i].memberID
        }
    }

    return (
        <>
        <div> 회원 전체 목록 테스트 </div>
        <ul>
            <li>{makeLi}</li>
        </ul>
        </>
    )
}


export default TotalListComponent;