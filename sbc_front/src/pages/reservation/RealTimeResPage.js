import React, {useState} from "react";
import campingImg from "../../images/campingimg.png"
import MonthComponent from "../../components/campingRes/MonthComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const RealTimeResPage = () => {

    return (
        <div>
            <div><h4>구역지도</h4></div>
            <hr></hr>
                <div style={{
                    marginBottom: "30px"
                }}>
                    <img style={{margin:"auto"}} src={campingImg} alt="안나와 왜"/>
                </div>

            <div>
                <MonthComponent></MonthComponent>
            </div>
        </div>
    );
};

export default RealTimeResPage;
