import { createBrowserRouter } from "react-router-dom";
import LinkLogin from "../pages/login/LinkLogin";
import LinkHome from "../pages/home/LinkHome";
import LinkApplication from "../pages/application/LinkApplication";
import LinkWorkSchedule from "../pages/work_schedule/LinkWorkSchedule";
import LinkReissuePassword from "../pages/reissue_password/LinkReissuePassword";
import LinkEmployeeInfo from "../pages/employee_info/LinkEmployeeInfo";

export const routers = createBrowserRouter([
  // ログイン画面
  {
    path: "",
    element: <LinkLogin /> 
  },
  // ホーム画面
  {
    path: "home",
    element: <LinkHome />,
    children: [
      // 各種申請画面
      {
        path: "application",
        element: <LinkApplication />
      },
      // 勤怠表提出
      {
        path: "work_schedule",
        element: <LinkWorkSchedule />
      },
      // 社員情報
      {
        path: "employee_info",
        element: <LinkEmployeeInfo />
      },
      // パスワード再発行
      {
        path: "reissue_password",
        element: <LinkReissuePassword />
      }
    ]
  }
])