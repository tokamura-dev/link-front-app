/**
 * 社員情報画面での状態管理項目
 */
export interface EmployeeInfoState {
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
  /** パネル開閉状態 */
  isOpenPanel: boolean
}

/**
 * 社員情報状態管理の初期化
 */
export const initialEmployeeInfoState: EmployeeInfoState = {
  employeeIdStart: "",
  employeeIdEnd: "",
  employeeName: "",
  dateOfJoinStart: "",
  dateOfJoinEnd: "",
  isOpenPanel: true
};

/**
 * 社員情報画面でのアクション定義
 */
type EmployeeInfoAction =
  | { type: "setEmployeeIdStart"; payload: string }
  | { type: "setEmployeeIdEnd"; payload: string }
  | { type: "setEmployeeName"; payload: string }
  | { type: "setDateOfJoinStart"; payload: string }
  | { type: "setDateOfJoinEnd"; payload: string }
  | { type: "setIsOpenPanel"; payload: boolean }
  | { type: "setClear";}

/**
 * 社員情報画面の状態管理の集約関数
 * @param employeeInfoState 社員情報状態管理
 * @param employeeInfoAction 社員情報ログインアクション定義
 * @returns 状態管理
 */
export const employeeInfoReducer = (
  employeeInfoState: EmployeeInfoState,
  employeeInfoAction: EmployeeInfoAction
): EmployeeInfoState => {
  switch (employeeInfoAction.type) {
    case "setEmployeeIdStart":
      return {
        ...employeeInfoState,
        employeeIdStart: employeeInfoAction.payload,
      };
    case "setEmployeeIdEnd":
      return {
        ...employeeInfoState,
        employeeIdEnd: employeeInfoAction.payload,
      };
    case "setEmployeeName":
      return {
        ...employeeInfoState,
        employeeName: employeeInfoAction.payload,
      };
    case "setDateOfJoinStart":
      return {
        ...employeeInfoState,
        dateOfJoinStart: employeeInfoAction.payload,
      };
    case "setDateOfJoinEnd":
      return {
        ...employeeInfoState,
        dateOfJoinEnd: employeeInfoAction.payload,
      };
    case "setIsOpenPanel":
      return {
        ...employeeInfoState,
        isOpenPanel: employeeInfoAction.payload,
      };
    case "setClear":
      return initialEmployeeInfoState;
    default:
      return employeeInfoState;
  }
};
