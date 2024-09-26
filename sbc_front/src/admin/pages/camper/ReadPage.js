import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponent from "../../components/camper/ReadComponent";

const ReadPage = () => {

    const {cbno} = useParams()
    const navigate = useNavigate()
    const [queryParams] = useSearchParams()

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 15
   
    const queryStr = createSearchParams({page, size}).toString()

    const moveToModify = useCallback((cbno)=> {
        navigate({
            pathname: `/campers/modify/${cbno}`,
            search: queryStr
        })
    },[cbno, page, size])

    const moveToList = useCallback(()=>{
        navigate({pathname:`/campers/list`})
    })

    return (
        <div>
           <div> Camper Read Page Component {cbno} </div>
           <div>
            
            <ReadComponent cbno={cbno}></ReadComponent>

            <button onClick={() => moveToList()}>목록</button>
            <button onClick={() => moveToModify(cbno)}>수정</button>
            <button>삭제</button>
           </div>
        </div>
    );
}

export default ReadPage;