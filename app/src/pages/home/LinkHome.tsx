import { FunctionComponent, useState } from "react";
import "./LinkHome.scss";
import LinkHeader from "../../component/common/header/LinkHeader";
import LinkFotter from "../../component/common/fotter/LinkFotter";
import LinkSideBar from "../../component/common/sidebar/LinkSideBar";
import { Outlet } from "react-router-dom";

const LinkHome: FunctionComponent = () => {

  const [screenName, setScreenName] = useState<string>('ホーム');

  const handleOnClickChangeName = (screenName: string): void => {
    setScreenName(screenName);
  }

  return (
    <div className="home-container">
      <LinkSideBar handleOnClick={handleOnClickChangeName} />
      <div className="home-main-container">
        <LinkHeader screenName={screenName} />
        <div className="home-contents">
          <Outlet />
        </div>
        <LinkFotter />
      </div>
    </div>
  );
};

export default LinkHome;
