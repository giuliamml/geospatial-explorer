import { useLocation } from "react-router-dom";

const Error = () => {
  const location = useLocation();
  const description: string = location.state?.description;

  return (
    <>{description && <h3>The following error occurred: {description}</h3>};</>
  );
};

export default Error;
