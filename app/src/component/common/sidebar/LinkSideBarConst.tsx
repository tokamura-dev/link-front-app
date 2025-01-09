import HomeIcon from "../../../assets/images/home.svg";
import LinkOfApplicationIcon from "../../../assets/images/kind_of_application.svg";
import WorkScheduleIcon from "../../../assets/images/work_schedule.svg";
import EmployeeInfoIcon from "../../../assets/images/employee_info.svg";
import ReissuePasswordIcon from "../../../assets/images/reissue_password.svg";

/**
 * サイドバーメニューの項目設定
 */
export interface LinkSideBarMenuConst {
  /** イメージアイコンパス */
  imageIconPath: string;
  /** 遷移先パス */
  screenPath: string;
  /** メニュー名 */
  menuTitle: string;
}

/**
 * サイドバーメニュー定義
 */
export const LinkSideBarMenuConstArray: LinkSideBarMenuConst[] = [
  {
    imageIconPath: HomeIcon,
    screenPath: "/home",
    menuTitle: "ホーム",
  },
  {
    imageIconPath: LinkOfApplicationIcon,
    screenPath: "/home/application",
    menuTitle: "各種申請",
  },
  {
    imageIconPath: WorkScheduleIcon,
    screenPath: "/home/work_schedule",
    menuTitle: "勤怠表提出",
  },
  {
    imageIconPath: EmployeeInfoIcon,
    screenPath: "/home/employee_info",
    menuTitle: "社員情報",
  },
  {
    imageIconPath: ReissuePasswordIcon,
    screenPath: "/home/reissue_password",
    menuTitle: "パスワード\n再発行",
  },
];
