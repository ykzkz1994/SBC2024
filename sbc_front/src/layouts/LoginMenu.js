import '../css/menu.css';
import { Link } from "react-router-dom"

const LoginMenu = () => {
    return(
        <>        
        <div className='imgwrap'>
            <img src="https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" id="menuImg"></img>
        </div>
        <div id='menubuttonwrap'>
          <Link to={'/login'} className='menubutton'>로그인</Link>
          <Link to={'#'} className='menubutton'>이메일찾기</Link>
          <Link to={'#'} className='menubutton'>비밀번호찾기</Link>
          <Link to={'#'} className='menubutton'>회원가입</Link>
        </div>
        </>

    );
    
}

export default LoginMenu;