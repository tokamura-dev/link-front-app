import { FunctionComponent, useReducer } from "react";
import LinkButton from "../../component/button/LinkButton";
import LinkTextBox from "../../component/tetx-box/LinkTextBox";
import "./LinkLogin.scss";
import { loginReducer, LoginState } from "./LinkLoginReducer";
import { isEmpty as _isEmpty } from "lodash";
import { CommonMessage } from "../../common/CommonMessage";
import {
  SignUpRequest,
  SignUpResponse,
  signUpService,
} from "./LinkLoginService";
import { useNavigate } from "react-router-dom";

/**
 * ログイン状態管理の初期化
 */
const initialLoginState: LoginState = {
  employeeId: "",
  employeeIdErrorFlg: false,
  employeeIdErrorMessage: "",
  password: "",
  passwordErrorFlg: false,
  passwordErrorMessage: "",
  errorMessageAtLogin: "",
};

const LinkLogin: FunctionComponent = () => {
  const navigate = useNavigate();
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  /**
   * 社員ID入力時処理
   * @param val 入力値
   */
  const handleOnChangeEmployeeId = (val: string): void => {
    dispatch({
      type: "setEmployeeIdError",
      payload: { employeeIdErrorFlg: false, employeeIdErrorMessage: "" },
    });
    dispatch({ type: "setEmployeeId", payload: val });
  };

  /**
   * パスワード入力時処理
   * @param val 入力値
   */
  const handleOnChangePassword = (val: string): void => {
    dispatch({
      type: "setPasswordError",
      payload: { passwordErrorFlg: false, passwordErrorMessage: "" },
    });
    dispatch({ type: "setPassword", payload: val });
  };

  /**
   * ログインボタン押下時処理
   */
  const handleOnClickLoginButton = async (): Promise<void> => {
    // 社員IDの未入力チェック
    if (_isEmpty(loginState.employeeId)) {
      dispatch({
        type: "setEmployeeIdError",
        payload: {
          employeeIdErrorFlg: true,
          employeeIdErrorMessage: CommonMessage.NOT_INPUT_ERROR.replace(
            "{0}",
            "社員ID"
          ),
        },
      });
      return;
    }
    // パスワードの未入力チェック
    if (_isEmpty(loginState.password)) {
      dispatch({
        type: "setPasswordError",
        payload: {
          passwordErrorFlg: true,
          passwordErrorMessage: CommonMessage.NOT_INPUT_ERROR.replace(
            "{0}",
            "パスワード"
          ),
        },
      });
      return;
    }
    // 社員IDの桁数チェック
    if (loginState.employeeId.length > 6) {
      dispatch({
        type: "setEmployeeIdError",
        payload: {
          employeeIdErrorFlg: true,
          employeeIdErrorMessage: CommonMessage.NUMBER_OF_DEGITS_ERROR.replace(
            "{0}",
            "社員ID"
          ).replace("{1}", "6"),
        },
      });
      return;
    }
    // パスワードの桁数チェック
    if (loginState.password.length > 30) {
      dispatch({
        type: "setPasswordError",
        payload: {
          passwordErrorFlg: true,
          passwordErrorMessage: CommonMessage.NUMBER_OF_DEGITS_ERROR.replace(
            "{0}",
            "パスワード"
          ).replace("{1}", "30"),
        },
      });
      return;
    }

    // 社員ID,パスワードを設定
    const signUpRequest: SignUpRequest = {
      employeeId: loginState.employeeId,
      password: loginState.password,
    };

    const authResult: SignUpResponse = await signUpService(signUpRequest);
    // サインアップが成功しており、JWTトークンが設定されている場合
    if (authResult.authResult && authResult.jwtToken) {
      localStorage.setItem("authToken", authResult.jwtToken);
      navigate("/home");
    } else if (authResult.message) {
      dispatch({
        type: "setErrorMessageAtLogin",
        payload: {
          errorMessageAtLogin: authResult.message
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="title">
        <span>ログイン</span>
      </div>
      <div className="error-message-field">
        <span>{loginState.errorMessageAtLogin}</span>
      </div>
      <div className="input-field">
        <LinkTextBox
          value={loginState.employeeId}
          errorFlg={loginState.employeeIdErrorFlg}
          errorMessage={loginState.employeeIdErrorMessage}
          textBoxType="text"
          labelName="社員ID"
          autoComplete="off"
          maxLength={6}
          handleOnChange={handleOnChangeEmployeeId}
        />
        <LinkTextBox
          value={loginState.password}
          errorFlg={loginState.passwordErrorFlg}
          errorMessage={loginState.passwordErrorMessage}
          textBoxType="password"
          labelName="パスワード"
          autoComplete="off"
          maxLength={30}
          handleOnChange={handleOnChangePassword}
        />
      </div>
      <div className="forgot-password">
        <span>パスワードをお忘れですか？</span>
      </div>
      <div className="login-button">
        <LinkButton
          size="large"
          buttonName="ログイン"
          handleOnClick={handleOnClickLoginButton}
        />
      </div>
    </div>
  );
};

export default LinkLogin;
