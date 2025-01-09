import { linkClientApiPost } from "../../common/api/LinkApi";


const _AUTH_BASE_URL = '/auth';

/**
 * サインアップAPIのリクエストインターフェース
 */
export interface SignUpRequest {
  /** 社員ID */
  employeeId: string;
  /** パスワード */
  password: string;
}

/**
 * サインアップAPIのレスポンスインターフェイス
 */
export interface SignUpResponse {
  /** 認証結果 */
  authResult: boolean;
  /** JWTトークン文字列 */
  jwtToken: string;
  /** エラーメッセージ */
  message: string;
}

/**
 * サインアップレスポンスの初期化
 */
const initialSignUpResponse: SignUpResponse = {
  authResult: false,
  jwtToken: "",
  message: ""
}

/**
 * サインアップAPIのサービス
 * @param data サインアップAPIのリクエストデータ
 * @returns JWT認証情報
 */
export const signUpService = async (data: SignUpRequest): Promise<SignUpResponse> => {

  // サインアップレスポンスの初期化
  let signUpResponse: SignUpResponse = initialSignUpResponse;

  // サインアップAPIの呼び出し
  const response = await linkClientApiPost<SignUpResponse>(_AUTH_BASE_URL + '/signin', data);
  if (response) {
    signUpResponse = response;
  }
  return signUpResponse;
}