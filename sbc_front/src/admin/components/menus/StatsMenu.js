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

function init() {
for (var i = 0; i < div2.length; i++) {
    div2[i].addEventListener("click", handleClick);
}
}

init();

const StatsMenu = () => {
    return(
        <>        
        <div id='menubuttonwrap'>
          <Link to={'#'} className='menubutton'>매출 통계</Link>
          <Link to={'#'} className='menubutton'>추가 통계</Link>
        </div>
        </>

    );
    
}

export default StatsMenu;