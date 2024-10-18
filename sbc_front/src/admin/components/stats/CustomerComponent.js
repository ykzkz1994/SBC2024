import DateSearchComponent from "./DateSearchComponent";

const CustomerComponent = ( )=> {
    const wrapperStyle = {
        width: '100%',
        height: '400px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    return (
        <>
            <DateSearchComponent/>
            <div className={"genderAge"} style={wrapperStyle}>
                <h4>성별/연령별 비중</h4>
                <div>
                    해당 그래프
                </div>
            </div>
            <div className={"local"} style={wrapperStyle}>
                <h4>지역별 비중</h4>
                <div>
                    해당 그래프
                </div>
            </div>
            <div className={"analyse"} style={wrapperStyle}>
                <h4>누적 예약 고객 분석</h4>
                <fieldset>
                    <legend>총 누적 예약 고객수</legend>
                    (일 평균 예약 고객수)
                </fieldset>
                <fieldset>
                    <legend>재예약 고객 비율</legend>
                </fieldset>
            </div>
            <div className={"performance"} style={wrapperStyle}>
                <h4>최다예약/최다취소 고객</h4>
            </div>
        </>
    );
}

export default CustomerComponent