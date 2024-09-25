import {Link} from "react-router-dom"

const BasicMenu = () => {
    return(
       <nav id='navbar'>
        <div id='logo'><Link to={'/'}>logo이미지</Link></div>
        <div>
            <ul>
                <li>
                    <Link to={'/api/admin/site/list'}>구역 관리</Link>
                </li>
                <li>
                <Link to={'/api/admin/res/totallist'}>캠핑장 예약 관리</Link>
                    </li>
                <li>
                <Link to={'/api/admin/members'}>회원 관리</Link>
                    </li>
                <li>
                <Link to={'/api/admin/campers'}>커뮤니티 관리</Link>
                    </li>
                <li>
                <Link to={'/api/admin/stats'}>통계 관리</Link>  
                </li>
            </ul>
        </div>
        <div>로그아웃</div>
        </nav>
    );
}

export default BasicMenu;