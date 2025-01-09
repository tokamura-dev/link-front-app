import { FunctionComponent } from "react";
import "./LinkHeader.scss";
import LogoutIcon from "../../../assets/images/logout.svg"

type Props = {
  screenName: string
}

const LinkHeader: FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="header-container">
      <div className="header-main">
        <div className="header-screen-title">
          <span>{props.screenName}</span>
        </div>
        <div className="header-employee-info">
          <div className="header-employee-id">
            <span>社員ID：000001</span>
          </div>
          <div className="header-employee-name">
            <span>氏名：田中 太郎</span>
          </div>
        </div>
        <div className="header-logout">
          <div className="header-logout-img">
            <img src={LogoutIcon} alt="" />
          </div>
          <div className="header-logout-name">
            <a href="*">ログアウト</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkHeader;
