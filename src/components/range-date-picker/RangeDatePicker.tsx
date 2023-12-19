import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PropTypes = {
  handleOnChange: () => void;
  startDate: Date | null;
  endDate: Date | null;
};

const RangeDatePicker = ({ handleOnChange, startDate, endDate }: PropTypes) => {
  return (
    <>
      <label htmlFor="form-control">Dates of interest:</label>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleOnChange}
        isClearable
        className="form-control"
        dateFormat="dd/MM/yyyy"
      />
    </>
  );
};

export default RangeDatePicker;
