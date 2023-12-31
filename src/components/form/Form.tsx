import moment from "moment";
import Stack from "react-bootstrap/Stack";
import Button from "../button/Button";
import RangeDatePicker from "../range-date-picker/RangeDatePicker";

type Dates = [string, string] | [null, null];

type PropTypes = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setDates: (dates: Dates) => void;
  dates: Dates;
};

const Form = ({ handleClick, setDates, dates }: PropTypes) => {
  const handleOnChange = (update: [string, string]) => {
    if (update) {
      const [start, end] = update.map((date) =>
        date ? moment(date).format("YYYY-MM-DDTHH:mm:ssZ") : null
      );
      setDates([start, end] as [string, string]);
    } else {
      setDates([null, null]);
    }
  };

  return (
    <Stack gap={3} direction="vertical">
      <RangeDatePicker
        //@ts-expect-error
        handleOnChange={handleOnChange}
        startDate={dates[0] ? new Date(dates[0]) : null}
        endDate={dates[1] ? new Date(dates[1]) : null}
      />
      <Button
        handleClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
        label="search"
      />
    </Stack>
  );
};

export default Form;
