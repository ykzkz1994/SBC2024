import '../css/menu.css';
import { Link } from "react-router-dom"

const ReservationMenu = () => {
    return(
        <>        
        <div className='imgwrap'>
            <img src="https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" id="menuImg"></img>
        </div>
        <div id='menubuttonwrap'>
          <Link to={'/res/info'} className='menubutton'>예약/요금안내</Link>
          <Link to={'/res/realtime'} className='menubutton'>실시간예약</Link>
        </div>
        </>

    );
    
}

export default ReservationMenu;