const ResList = () => {

    return (

        <div>
            <h2>예약 현황 리스트</h2>

            <div>
                <table className="table-fixed w-full border-separate rounded-[20px] border-8">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 p-4 bg-gray-200">예약 번호</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">예약 날짜</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">예약 구역</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">회원 이름</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">회원 전화번호</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">예약자 이름</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">예약자 전화번호</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">입실 날짜</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">퇴실 날짜</th>
                        <th className="border border-gray-300 p-4 bg-gray-200">총 결제 금액</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-gray-300 p-4">Res_ID</td>
                        <td className="border border-gray-300 p-4">Res_Date</td>
                        <td className="border border-gray-300 p-4">Site_ID</td>
                        <td className="border border-gray-300 p-4">Member_Name</td>
                        <td className="border border-gray-300 p-4">Member_Phone</td>
                        <td className="border border-gray-300 p-4">Res_User_Name</td>
                        <td className="border border-gray-300 p-4">Res_User_Phone</td>
                        <td className="border border-gray-300 p-4">Checkin_Date</td>
                        <td className="border border-gray-300 p-4">Checkout_Date</td>
                        <td className="border border-gray-300 p-4">Res_Total_Pay</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-4">Res_ID</td>
                        <td className="border border-gray-300 p-4">Res_Date</td>
                        <td className="border border-gray-300 p-4">Site_ID</td>
                        <td className="border border-gray-300 p-4">Member_Name</td>
                        <td className="border border-gray-300 p-4">Member_Phone</td>
                        <td className="border border-gray-300 p-4">Res_User_Name</td>
                        <td className="border border-gray-300 p-4">Res_User_Phone</td>
                        <td className="border border-gray-300 p-4">Checkin_Date</td>
                        <td className="border border-gray-300 p-4">Checkout_Date</td>
                        <td className="border border-gray-300 p-4">Res_Total_Pay</td>
                    </tr>
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default ResList