/**
 * ログイン画面での状態管理項目
 */
export interface LoginState {
  /** 社員ID */
  employeeId: string;
  /** 社員IDのエラーフラグ */
  employeeIdErrorFlg: boolean;
  /** 社員IDのエラーメッセージ */
  employeeIdErrorMessage: string;
  /** パスワード */
  password: string;
  /** パスワードのエラーフラグ */
  passwordErrorFlg: boolean;
  /** パスワードのエラーメッセージ */
  passwordErrorMessage: string;
  /** ログイン時エラーメッセージ */
  errorMessageAtLogin: string;
}

/**
 * ログイン画面でのアクション定義
 */
type LoginAction =
  | { type: "setEmployeeId"; payload: string }
  | { type: "setPassword"; payload: string }
  | {
      type: "setEmployeeIdError";
      payload: { employeeIdErrorFlg: boolean; employeeIdErrorMessage: string };
    }
  | {
      type: "setPasswordError";
      payload: { passwordErrorFlg: boolean; passwordErrorMessage: string };
    }
  | {
      type: "setErrorMessageAtLogin";
      payload: { errorMessageAtLogin: string };
    };

/**
 * ログイン画面の状態管理の集約関数
 * @param loginState ログイン状態管理
 * @param loginAction ログインアクション定義
 * @returns 状態管理
 */
export const loginReducer = (
  loginState: LoginState,
  loginAction: LoginAction
): LoginState => {
  switch (loginAction.type) {
    case "setEmployeeId":
      return { ...loginState, employeeId: loginAction.payload };
    case "setPassword":
      return { ...loginState, password: loginAction.payload };
    case "setEmployeeIdError":
      return {
        ...loginState,
        employeeIdErrorFlg: loginAction.payload.employeeIdErrorFlg,
        employeeIdErrorMessage: loginAction.payload.employeeIdErrorMessage,
      };
    case "setPasswordError":
      return {
        ...loginState,
        passwordErrorFlg: loginAction.payload.passwordErrorFlg,
        passwordErrorMessage: loginAction.payload.passwordErrorMessage,
      };
    case "setErrorMessageAtLogin":
      return {
        ...loginState,
        errorMessageAtLogin: loginAction.payload.errorMessageAtLogin
      }
    default:
      return loginState;
  }
};
