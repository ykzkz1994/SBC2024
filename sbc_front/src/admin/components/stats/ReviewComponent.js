const ReviewComponent = () => {
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
            <div style={wrapperStyle}>
                <h3>태그별 통계</h3>
                해당 graph
            </div>
            <div>
                시간이 허락된다면 추가하고 싶은 내용 : 태그별 선호 구역, 태그별 고객분석
            </div>
        </>
    );
}

export default ReviewComponent;