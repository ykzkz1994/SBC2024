import "../../css/join.css";

const JoinCompletePage = () =>{
    return(
        <div style={{ border:"1px solid grey"}}>
            <div className={"orderbox"}>
                <span>이용약관</span> > <span>정보입력</span> > <span><b>가입완료</b></span>
            </div>
            <div style={{textAlign:"center", padding:"50px", }}>
                회원가입이 완료되었습니다.<br></br>
                Suspension Bridge 캠핑장 회원이 되신 것을 환영합니다.<br></br>
                실시간 예약과 커뮤니티 게시판을 이용하실 수 있습니다.
            </div>
            <div style={{textAlign:"center", margin:"50px"}}>
                <button>로그인하기</button>
            </div>
        </div>
    );
}

export default JoinCompletePage;