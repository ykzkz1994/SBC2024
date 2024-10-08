import AddComponent from "../../components/campers/AddComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const AddPage = () => {

    // 로그인 여부 확인
    const {isLogin, moveToLoginReturn} = useCustomLogin()
    if(!isLogin){
        return moveToLoginReturn()
    }

    return (
        <div className="container p-4">
            <div className="text-center mb-4">
                <h1 className="display-4 font-weight-bold">
                    CamperBoard Add Page
                </h1>
            </div>
            <AddComponent />
        </div>
    );
}

export default AddPage;
