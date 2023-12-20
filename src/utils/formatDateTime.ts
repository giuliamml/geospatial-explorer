import moment from "moment";

export const formatDate = (isoDateString: string) => {
  const date = moment(isoDateString);
  return date.isValid() ? date.format("YYYY/MM/DD") : "Invalid Date";
};

export const formatTime = (isoDateString: string) => {
  const time = moment(isoDateString);
  return time.isValid() ? time.format("h:mm:ss a") : "Invalid Time";
};
