import Button from "@mui/material/Button/Button";
import { FunctionComponent } from "react";

type Props = {
  /** ボタン名 */
  buttonName: string;
  /** ボタンサイズ */
  size: "small" | "medium" | "large" | undefined;
  /** ボタン押下時処理 */
  handleOnClick: () => void;
};

const LinkButton: FunctionComponent<Props> = (props: Props) => {
  const handleOnClick = () => {
    props.handleOnClick();
  };

  return (
    <Button size={props.size} variant="contained" onClick={handleOnClick}>
      {props.buttonName}
    </Button>
  );
};

export default LinkButton;
