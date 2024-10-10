import React, {useRef, useState} from 'react';

const initState = {
    qboardTitle :'',
    qboardContent:'',
    file:''
}

function AddComponent(props) {
   const [qna,setQna] = useState({...initState})
    const uploadRef = useRef()

    const handleChangeQna = (e) => {

    }

    return (
        <div>
제목, 내용, 첨부
        </div>
    );
}

export default AddComponent;