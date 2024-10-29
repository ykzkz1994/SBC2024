import BasicLayout from "../../layouts/BasicLayout";
import CommunityMenu from "../../layouts/CommunityMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const CamperIndexPage = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" });
  });
  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "add" });
  });
//index페이지 = 모든 페이지에 공통 레이아웃과 메뉴 적용
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
