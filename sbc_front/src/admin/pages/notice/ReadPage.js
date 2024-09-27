import {useParams} from "react-router-dom";

const ReadPage =()=>{

    const {nid} = useParams()

    return (
      <div>
          <h1>{nid}번 공지사항   </h1>

      </div>
    );

}