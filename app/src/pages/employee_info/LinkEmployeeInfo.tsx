import { FunctionComponent, useReducer } from "react";
import "./LinkEmployeeInfo.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LinkTextBox from "../../component/tetx-box/LinkTextBox";
import LinkDatePicker from "../../component/date-picker/LinkDatePicker";
import LinkButton from "../../component/button/LinkButton";
import {
  employeeInfoReducer,
  initialEmployeeInfoState,
} from "./LinkEmployeeInfoReducer";
import {
  EmployeeInfoSearchRequest,
  EmployeeInfoSearchResponse,
  searchEmployeeInfo,
} from "./LinkEmployeeInfoService";

const LinkEmployeeInfo: FunctionComponent = () => {
  const [employeeInfoState, dispatch] = useReducer(
    employeeInfoReducer,
    initialEmployeeInfoState
  );

  /**
   * パネル開閉時処理
   * @param isOpen パネル開閉状態
   */
  const handleOnChangeOpenPanel = (isOpen: boolean) => {
    dispatch({
      type: "setIsOpenPanel",
      payload: !isOpen,
    });
  };

  /**
   * 社員ID(開始)入力時処理
   * @param val 入力値
   */
  const handleOnChangeEmployeeIdStart = (val: string): void => {
    dispatch({
      type: "setEmployeeIdStart",
      payload: val,
    });
  };

  /**
   * 社員ID(終了)入力時処理
   */
  const handleOnChangeEmployeeIdEnd = (val: string): void => {
    dispatch({
      type: "setEmployeeIdEnd",
      payload: val,
    });
  };

  /**
   * 氏名入力時処理
   * @param val 入力値
   */
  const handleOnChangeEmployeeName = (val: string): void => {
    dispatch({
      type: "setEmployeeName",
      payload: val,
    });
  };

  /**
   * 入社年月(開始)入力時処理
   * @param val 入力値
   */
  const handleOnChangeDateOfJoinStart = (val: string): void => {
    alert(val);
    dispatch({
      type: "setDateOfJoinStart",
      payload: val,
    });
  };

  /**
   * 入社年月(終了)入力時処理
   * @param val 入力値
   */
  const handleOnChangeDateOfJoinEnd = (val: string): void => {
    dispatch({
      type: "setDateOfJoinEnd",
      payload: val,
    });
  };

  /**
   * クリアボタン押下時処理
   */
  const handleOnClickClear = (): void => {
    dispatch({
      type: "setClear",
    });
  };

  /**
   * 検索ボタン押下時処理
   */
  const handleOnClickSearch = async (): Promise<void> => {
    const employeeInfoSearchRequest: EmployeeInfoSearchRequest = {
      employeeIdStart: employeeInfoState.employeeIdStart,
      employeeIdEnd: employeeInfoState.employeeIdEnd,
      employeeName: employeeInfoState.employeeName,
      dateOfJoinStart: employeeInfoState.dateOfJoinStart,
      dateOfJoinEnd: employeeInfoState.dateOfJoinEnd,
    };
    const employeeInfoResult: EmployeeInfoSearchResponse =
      await searchEmployeeInfo(employeeInfoSearchRequest);
    if (employeeInfoResult) {
      console.log(employeeInfoResult.searchResultCount);
      console.log(employeeInfoResult.searchResult);
    }
  };

  return (
    <div className="employee-info-container">
      <Accordion
        onChange={() => {
          handleOnChangeOpenPanel(employeeInfoState.isOpenPanel);
        }}
        expanded={employeeInfoState.isOpenPanel}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>検索条件</Typography>
        </AccordionSummary>
        <AccordionDetails className="employee-info-serach-condition-detail">
          <div className="employee-info-search-condition-first">
            <LinkTextBox
              value={employeeInfoState.employeeIdStart}
              labelName="社員ID"
              textBoxType="search"
              variant="outlined"
              errorFlg={false}
              errorMessage={""}
              autoComplete="off"
              className="serach-condition-employee-id-start"
              maxLength={6}
              handleOnChange={handleOnChangeEmployeeIdStart}
            />
            <div className="tilde">〜</div>
            <LinkTextBox
              value={employeeInfoState.employeeIdEnd}
              labelName="社員ID"
              textBoxType="search"
              variant="outlined"
              errorFlg={false}
              errorMessage={""}
              autoComplete="off"
              className="serach-condition-employee-id-end"
              maxLength={6}
              handleOnChange={handleOnChangeEmployeeIdEnd}
            />
            <LinkTextBox
              value={employeeInfoState.employeeName}
              labelName="氏名"
              textBoxType="search"
              variant="outlined"
              errorFlg={false}
              errorMessage={""}
              autoComplete="off"
              className="serach-condition-employee-name"
              maxLength={30}
              handleOnChange={handleOnChangeEmployeeName}
            />
            <LinkDatePicker
              className="serach-condition-date-of-join-start"
              label="入社年月"
              format="YYYY年MM月"
              handleOnChange={handleOnChangeDateOfJoinStart}
            />
            <div className="tilde">〜</div>
            <LinkDatePicker
              className="serach-condition-date-of-join-end"
              label="入社年月"
              format="YYYY年MM月"
              handleOnChange={handleOnChangeDateOfJoinEnd}
            />
            <div className="serach-condition-button-group">
              <LinkButton
                buttonName="クリア"
                size="large"
                variant="outlined"
                className="serach-condition-clear-button"
                handleOnClick={handleOnClickClear}
              />
              <LinkButton
                buttonName="検索"
                size="large"
                className="serach-condition-search-button"
                handleOnClick={handleOnClickSearch}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className="search-result-container">
        <div className="search-result">
          <div className="search-result-title">
            <span>検索結果</span>
          </div>
          <div className="search-result-count">
            <span>10件</span>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="search-result-table-header">
              <TableRow className="search-result-table-header-row">
                <TableCell className="search-result-table-header-cell">
                  社員ID
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  社員氏名
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  社員氏名(カナ)
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  入社年月日
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  生年月日
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  年齢
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  性別
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  電話番号
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  メールアドレス
                </TableCell>
                <TableCell className="search-result-table-header-cell">
                  住所
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
              <TableRow className="search-result-table-body-row">
                <TableCell className="search-result-table-body-cell">
                  000001
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  田中 太郎
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  タナカ タロウ
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  2000年10月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  1990年01月01日
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  34歳
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  男性
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  090-1234-5678
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  test@gmail
                </TableCell>
                <TableCell className="search-result-table-body-cell">
                  東京都千代田区麹町１−１−１
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LinkEmployeeInfo;
