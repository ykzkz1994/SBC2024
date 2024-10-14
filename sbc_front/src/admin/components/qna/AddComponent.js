import React, {useRef, useState} from 'react';

const initState = {
    qboardTitle :'',
    qboardContent:'',
    file:''
}

function AddComponent(props) {
   const [qna,setQna] = useState({...initState})

    return (
      <>
      <div>qna add component</div>
      </>
    );
}

export default AddComponent;