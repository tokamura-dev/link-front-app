import Button from "@mui/material/Button/Button";
import { FunctionComponent } from "react";

type Props = {
  /** ボタン名 */
  buttonName: string;
  /** ボタンサイズ */
  size: "small" | "medium" | "large" | undefined;
  /** クラス名 */
  className?: string;
  /** ボタンデザイン */
  variant?: "text" | "outlined" | "contained"
  /** ボタン押下時処理 */
  handleOnClick: () => void;
};

const LinkButton: FunctionComponent<Props> = (props: Props) => {
  const handleOnClick = () => {
    props.handleOnClick();
  };

  return (
    <Button
      className={props.className}
      size={props.size}
      variant={props.variant === undefined ? "contained" : props.variant}
      onClick={handleOnClick}
    >
      {props.buttonName}
    </Button>
  );
};

export default LinkButton;
