import BasicLayout from "../../layouts/BasicLayout";
import CommunityMenu from "../../layouts/CommunityMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const CamperIndexPage = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" });
  });
  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "add" });
  });

    // 로그인 여부 확인
    const {isLogin, moveToLoginReturn} = useCustomLogin()
    if(!isLogin){
        alert('회원만 이용가능합니다.');
        return moveToLoginReturn()
    }

  return (
    <BasicLayout>
      <CommunityMenu />
      <div>
        <Outlet />
      </div>
    </BasicLayout>
  );
};
export default CamperIndexPage;
