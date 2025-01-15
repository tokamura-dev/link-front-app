import { linkClientApiGet } from "../../common/api/LinkApi";
import { isEmpty as _isEmpty } from "lodash";

const _EMPLOYEE_INFO_BASE_URL = '/business/employeeinfo';

/**
 * 社員情報検索APIのリクエストインターフェース
 */
export interface EmployeeInfoSearchRequest {
  /** 社員ID(開始) */
  employeeIdStart: string;
  /** 社員ID(終了) */
  employeeIdEnd: string;
  /** 氏名 */
  employeeName: string;
  /** 入社年月(開始) */
  dateOfJoinStart: string;
  /** 入社年月(終了) */
  dateOfJoinEnd: string;
}

/**
 * 社員情報インターフェース
 */
export interface EmployeeInfo {
  /** 社員ID */
  employeeId: string;
  /** 社員氏名 */
  employeeName: string;
  /** 社員氏名(カナ) */
  employeeNameKana: string;
  /** 入社年月日 */
  joinOfDay: string;
  /** 生年月日 */
  birthday: string;
  /** 年齢 */
  age: number;
  /** 電話番号 */
  phoneNumber: string;
  /** メールアドレス */
  mailAddress: string;
  /** 住所 */
  address: string;
}

/**
 * 社員情報検索APIのレスポンスインターフェース
 */
export interface EmployeeInfoSearchResponse {
  /** 検索結果件数 */
  searchCount: number;
  /** 検索結果 */
  searchResult: EmployeeInfo[];
}

/**
 * 社員情報検索APIのレスポンスの初期化
 */
const initialEmployeeInfoSearchResponse: EmployeeInfoSearchResponse = {
  searchCount: 0,
  searchResult: [],
};

export const searchEmployeeInfo = async (searchCondition: EmployeeInfoSearchRequest): Promise<EmployeeInfoSearchResponse> => {

  const queryParam = new URLSearchParams();

  // 社員ID(開始)
  if (!_isEmpty(searchCondition.employeeIdStart)) {
    queryParam.append("employeeIdStart", searchCondition.employeeIdStart);
  }
  // 社員ID(終了)
  if (!_isEmpty(searchCondition.employeeIdEnd)) {
    queryParam.append("employeeIdEnd", searchCondition.employeeIdEnd);
  }
  // 氏名
  if (!_isEmpty(searchCondition.employeeName)) {
    queryParam.append("employeeName", searchCondition.employeeName);
  }
  // 入社年月(開始)
  if (!_isEmpty(searchCondition.dateOfJoinStart)) {
    queryParam.append("dateOfJoinStart", searchCondition.dateOfJoinStart);
  }
  // 入社年月(終了)
  if (!_isEmpty(searchCondition.dateOfJoinEnd)) {
    queryParam.append("dateOfJoinEnd", searchCondition.dateOfJoinEnd);
  }

  const employeeInfoSearchResponse: EmployeeInfoSearchResponse = initialEmployeeInfoSearchResponse;

  let urlPath: string = _EMPLOYEE_INFO_BASE_URL + "/get_employee_info";
  if (!_isEmpty(queryParam.toString())) {
    urlPath = urlPath + "?" + queryParam.toString()
  }

  const response = await linkClientApiGet<EmployeeInfoSearchResponse>(urlPath);
  if (response) {
    employeeInfoSearchResponse.searchCount = response.searchCount;
    employeeInfoSearchResponse.searchResult = response.searchResult;
  }
  return employeeInfoSearchResponse;
}