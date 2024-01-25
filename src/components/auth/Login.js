import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/AuthService";


function Login(props) {
  const [inputField, setInputField] = useState({
    email: "",
    password: ""
  })
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    AuthService.login(inputField.email, inputField.password)
      .then(response => {
				if (response.data.token) {
					localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
          window.location.reload();
				}
      },
			error => {
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

        setMessage(resMessage);
			}
		);
  }

  return (
    <div className="card card-container col-md-3 col-sm-60 mx-auto p-0 mt-5">
	  	<h3 className="text-success text-uppercase text-center mt-4">
        Login
      </h3>
      <div className="m-4">
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              value={inputField.email}
              onChange={inputsHandler}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={inputField.password}
              onChange={inputsHandler}
            />
          </FormGroup>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <Button color="success" onClick={handleLogin}>
          	Войти
        	</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;