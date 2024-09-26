import Table from "react-bootstrap/Table";

const ResList = () => {

    return (

        <div>
            <h2>예약 현황 리스트 컴포넌트 나중에 다중 for로 돌려도 될 듯 </h2>

            <div>
                <Table  border hover responsive className="text-sm">
                    <thead>
                    <tr>
                        <th>#</th>

                        {/*예약번호,예약날짜,예약구역,회원이름,회원전화번호,예약자이름,예약자 전화번호,입실날짜,퇴실날짜,취소날짜,취소사유,총결제금액 순서로 불러와서 배열에 저장해야함*/}

                        {Array.from({ length: 12 }).map((_, index) => (
                            <th key={index}>DB에서 받아온 정보</th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>1</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>첫번째 예약 컬럼 값{index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>두번째 예약 컬럼 값{index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>세번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>4</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>4번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>5</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>5번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>6</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>6번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>7</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>7번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>8</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>8번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>9</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>9번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>10</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>10번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>11</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>11번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>12</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>12번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>13</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>13번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>14</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>14번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>15</td>
                        {Array.from({length: 12}).map((_, index) => (
                            <td key={index}>15번째 예약 컬럼 값 {index}</td>
                        ))}
                    </tr>


                    </tbody>
                </Table>

            </div>

        </div>
    );
}

export default ResList