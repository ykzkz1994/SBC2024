import Table from 'react-bootstrap/Table';
import {useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const LostItemListPage = () => {

    const loginState = useSelector(state => state.loginSlice);
    const email = loginState.member.memberEmail;
    const navigate = useNavigate();
    
    return(
        <>
            <div>
                <h4>분실물 목록</h4>
                <hr></hr>
            </div>

            <div>
                <Table hover={true}>
                    <thead>
                        <tr>
                            <th>분실물번호</th>
                            <th>분류</th>
                            <th>분실물 등록일</th>
                            <th>습득 장소</th>
                            <th>설명</th>
                            <th>보관상태</th>
                            <th>이미지</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>예제</td>
                            <td>테스트</td>
                            <td>2024-10-28</td>
                            <td>편의점</td>
                            <td>파란 우산</td>
                            <td>보관중</td>
                            <td>이미지URL</td>
                        </tr>
                        <tr>
                            <td>dd</td>
                            <td>ㅇㅇ</td>
                            <td>2024-10-28</td>
                            <td>편의점</td>
                            <td>파란 우산</td>
                            <td>보관중</td>
                            <td>이미지URL</td>
                        </tr>
                    </tbody>
                </Table>
                {email === 'admin@sbc.com' ? <Button size="sm" variant="dark" onClick={() => navigate('/lost/add')}>등록하기</Button> : <></>}
            </div>
        </>
    )
}
export default LostItemListPage;