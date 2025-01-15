import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FunctionComponent } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ja";

type Props = {
  /** ラベル */
  label: string;
  /** 日付のフォーマット指定 */
  format: string;
  /** クラス名 */
  className?: string;
  /** 値入力時処理 */
  handleOnChange: (val: string) => void;
};

dayjs.locale("ja");

const LinkDatePicker: FunctionComponent<Props> = (props: Props) => {

  /**
   * 値入力時処理
   * @param event 入力値
   */
  const handleOnChange = (dateVal: Date | null) => {
    const val: string = dateVal === null ? '' : dayjs(dateVal).format("YYYYMM");
    props.handleOnChange(val);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className={props.className}
        label={props.label}
        format={props.format}
        slotProps={{
          calendarHeader: {
            format: props.format,
          },
        }}
        views={['year', 'month']}
        onChange={handleOnChange}
      />
    </LocalizationProvider>
  );
};

export default LinkDatePicker;
