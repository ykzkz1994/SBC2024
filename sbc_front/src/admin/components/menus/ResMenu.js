import '../../css/menu.css';
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

const ResMenu = () => {
    useEffect(() => {
        // 클릭 이벤트 핸들러
        const handleClick = (event) => {
            const div2 = document.getElementsByClassName("menubutton");

            if (event.target.classList.contains("clicked")) {
                event.target.classList.remove("clicked");
            } else {
                for (let i = 0; i < div2.length; i++) {
                    div2[i].classList.remove("clicked");
                }
                event.target.classList.add("clicked");
            }
        };


const ResMenu = () => {
    return(
        <>        
        <div id='menubuttonwrap'>
            <Link to='total' className='menubutton'>전체 예약 리스트</Link>
            <Link to='datesite' className='menubutton'>날짜 / 구역별 예약</Link>
        </div>
    );
}

export default ResMenu;
