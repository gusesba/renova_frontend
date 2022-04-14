import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useGlobalContext } from "../context";

const BottomAlert = () => {
  const { alert, setAlert } = useGlobalContext();

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const dismissAlert = async () => {
    await sleep(3000);
    setAlert({ show: false });
  };

  useEffect(() => {
    if (alert.show === true) {
      dismissAlert();
    }
  }, [alert]);

  return (
    <Alert className="alert" show={alert.show} variant={alert.variant}>
      <p>{alert.message}</p>
    </Alert>
  );
};

export default BottomAlert;
