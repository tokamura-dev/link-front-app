import { FunctionComponent } from "react";
import "./LinkSideBar.scss";
import SystemTitleIcoon from "../../../assets/images/system_title_icon.svg";
import {
  LinkSideBarMenuConst,
  LinkSideBarMenuConstArray,
} from "./LinkSideBarConst";
import { Link } from "react-router-dom";

type Props = {
  /** クリック押下時処理 */
  handleOnClick: (screenName: string) => void;
};

const LinkSideBar: FunctionComponent<Props> = (props: Props) => {
  // サイドバーメニューの定義取得
  const linkSideBarMenuConstArray: LinkSideBarMenuConst[] =
    LinkSideBarMenuConstArray;

  const handleOnClickChangeScreenName = (screenName: string): void => {
    props.handleOnClick(screenName);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-title">
        <div className="sidebar-title-img">
          <img src={SystemTitleIcoon} alt="" />
        </div>
        <div className="sidebar-title-name">
          <span>Time Box</span>
        </div>
      </div>
      {linkSideBarMenuConstArray.map((menu, index) => (
        <div key={index} className="sidebar-menu">
          <div className="sidebar-menu-img">
            <img src={menu.imageIconPath} alt="" />
          </div>
          <div className="sidebar-menu-name">
            <Link
              to={menu.screenPath}
              onClick={() => handleOnClickChangeScreenName(menu.menuTitle)}
            >
              {menu.menuTitle}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkSideBar;
