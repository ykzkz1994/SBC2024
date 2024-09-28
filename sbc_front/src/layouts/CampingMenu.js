import '../css/menu.css';
import { Link } from "react-router-dom"

const CampingMenu = () => {
    return(
        <>        
        <div className='imgwrap'>
            <img src="https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" id="menuImg"></img>
        </div>
        <div id='menubuttonwrap'>
          <Link to={'/camping/intro'} className='menubutton'>캠핑장 소개</Link>
          <Link to={'/camping/guide'} className='menubutton'>시설안내도</Link>
          <Link to={'/camping/how'} className='menubutton'>찾아오시는 길</Link>
        </div>
        </>

    );
    
}

export default CampingMenu;