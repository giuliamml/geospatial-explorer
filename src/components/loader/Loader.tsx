import Spinner from "react-bootstrap/Spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <Spinner className={styles.loader} animation="border" role="status" />
  );
};

export default Loader;
