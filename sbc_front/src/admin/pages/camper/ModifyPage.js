import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifyPage = () => {

    const {cbno} = useParams()
    const navigate = useNavigate()
   
    const moveToRead = useCallback((cbno)=> {
        navigate({
            pathname: `/campers/read/${cbno}`,
        })
    },[cbno])


    return (
        <div>
           <div> Camper Read Page Component {cbno} </div>
           <div>
            <button onClick={() => moveToRead(cbno)}>등록</button>
           </div>
        </div>
    );
}

export default ModifyPage;