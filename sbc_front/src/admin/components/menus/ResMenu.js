import '../../css/menu.css';
import { Link } from "react-router-dom"

var div2 = document.getElementsByClassName("menubutton");

function handleClick(event) { 
if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
} 
else {
    for (var i = 0; i < div2.length; i++) {
    div2[i].classList.remove("clicked");
    }
    event.target.classList.add("clicked");
}
}

const ResMenu = () => {
    return(
        <>        
        <div id='menubuttonwrap'>
          <Link to={'#'} className='menubutton'>전체 예약 리스트</Link>
          <Link to={'#'} className='menubutton'>날짜/구역별 예약 현황</Link>
        </div>
        </>

    );
    
}

export default ResMenu;