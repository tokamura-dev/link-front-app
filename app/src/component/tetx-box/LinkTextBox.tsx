import { FunctionComponent } from "react";
import { Box, TextField } from "@mui/material";
import "./LinkTextBox.scss";

type Props = {
  /** テキストボックスのラベル名 */
  labelName: string;
  /** テキストボックスの種類 */
  textBoxType: string;
  /** エラーフラグ */
  errorFlg: boolean;
  /** エラーメッセージ */
  errorMessage: string;
  /** オートコンプリート */
  autoComplete: string;
  /** 値入力時処理 */
  handleOnChange: (val: string) => void;
};

const LinkTextBox: FunctionComponent<Props> = (props: Props) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val: string = event.target.value;
    props.handleOnChange(val);
  };

  return (
    <Box className="text-box">
      <TextField
        error={props.errorFlg}
        autoComplete="off"
        type={props.textBoxType}
        id="standard-basic"
        label={props.labelName}
        variant="standard"
        className="text-field"
        helperText={props.errorMessage}
        onChange={handleOnChange}
      />
    </Box>
  );
};

export default LinkTextBox;
