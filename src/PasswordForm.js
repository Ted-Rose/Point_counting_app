import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./App.css";

function PasswordForm() {
  const [message, setMessage] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [inputHasError, setInputHasError] = React.useState(false);
  const [hideErrorMessage, setHideErrorMessage] = React.useState(true);

  const inputChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  let navigate = useNavigate();
  // let isPasswordValid = checkPassword(passwordInput);
  // console.log(isPasswordValid);

  const onSubmit = () => {
    if (Object.keys(passwordInput).length === 0) {
      setInputHasError(true);
      setMessage("Paroli prasi Raimim!");
    } else if (!checkPassword(passwordInput)) {
      setInputHasError(true);
      setMessage("bāc nav pareizās paroles");
    } else {
      console.log("Te", checkPassword(passwordInput));
      setInputHasError(false);
      setMessage("WOW! Kā tu zini paroli?!");
      // navigate("/komandas");
      // COMMENT OUT line above (navigate) to enable redirect
    }
    setHideErrorMessage(false);
  };

  async function checkPassword(passwordInput) {
    const response = await fetch(
      "https://my-json-server.typicode.com/Ted-Rose/fake_api_No1/booleans",
      {
        method: "POST",
        body: JSON.stringify({ passwordInput }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
    var isPasswordValid = await response.json();
    console.log("Parole ir pareiza?", { isPasswordValid });
    isPasswordValid = false; // Change to FALSE to test wrong password
    console.log(isPasswordValid);
    return isPasswordValid;
  }

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const messageClass = inputHasError ? "error" : "approved";
  const showMessage = hideErrorMessage ? "hide" : "show";

  return (
    <div className="App text-center">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={preventDefault}>
          <div className="form-floating">
            <input
              value={passwordInput}
              onChange={inputChangeHandler}
              name="email_input"
              id="floatingPassword"
              type="password"
              className={`${"form-control"} ${messageClass}`}
              placeholder=""
            />
            <label htmlFor="floatingPassword">Parole</label>
          </div>
          <button
            className="w-100 btn btn-med btn-primary"
            type="submit"
            onClick={onSubmit}
          >
            Ienākt
          </button>
          <div className={`${"message"} ${messageClass} ${showMessage}`}>
            {message}
          </div>
        </form>
      </main>
    </div>
  );
}

export default PasswordForm;
