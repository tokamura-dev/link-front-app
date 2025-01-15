import { FunctionComponent } from "react";
import { TextField, TextFieldVariants } from "@mui/material";

type Props = {
  /** テキストボックスの値 */
  value: string;
  /** テキストボックスのラベル名 */
  labelName: string;
  /** テキストボックスの枠種類 */
  variant?: TextFieldVariants;
  /** テキストボックスの種類 */
  textBoxType: string;
  /** エラーフラグ */
  errorFlg: boolean;
  /** エラーメッセージ */
  errorMessage: string;
  /** オートコンプリート */
  autoComplete: string;
  /** クラス名 */
  className?: string;
  /** 最大桁数 */
  maxLength: number;
  /** 値入力時処理 */
  handleOnChange: (val: string) => void;
};

const LinkTextBox: FunctionComponent<Props> = (props: Props) => {
  
  /**
   * 値入力時処理
   * @param event 入力値
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val: string = event.target.value;
    props.handleOnChange(val);
  };

  return (
    <TextField
      value={props.value}
      error={props.errorFlg}
      autoComplete="off"
      type={props.textBoxType}
      id="standard-basic"
      label={props.labelName}
      variant={props.variant === undefined ? "standard" : props.variant}
      helperText={props.errorMessage}
      className={props.className}
      slotProps={{
        htmlInput: {
          maxLength: props.maxLength
        }
      }}
      onChange={handleOnChange}
    />
  );
};

export default LinkTextBox;
