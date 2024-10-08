import { useSearchParams } from "react-router-dom";

const ListPage = () => {
    const [queryParams] = useSearchParams()
    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 15
    
    
    return(
       
        <div>
            <div> camper게시판 테스트 (리스트 컴포넌트) {page} --- {size} </div>
        </div>
        
    );
}

export default ListPage;