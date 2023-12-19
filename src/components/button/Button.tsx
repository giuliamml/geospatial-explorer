import { Button as BootstrapButton } from "react-bootstrap";
import styles from "./Button.module.css";

type PropTypes = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
};

const Button = ({ handleClick, label }: PropTypes) => {
  return (
    <BootstrapButton
      as="a"
      variant="primary"
      onClick={handleClick}
      className={styles.button}
    >
      {label}
    </BootstrapButton>
  );
};

export default Button;
