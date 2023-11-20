import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

import AuthService from "../../services/auth.service";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }

	handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    AuthService.login(this.state.email, this.state.password).then(
			() => {
				this.props.router.navigate("/profile");
				window.location.reload();
			},
			error => {
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				this.setState({ message: resMessage });
			}
		);
  }

  render() {
    return (
      <div className="card card-container col-md-3 col-sm-60 mx-auto p-0 mt-5">
				<h3 className="text-success text-uppercase text-center mt-4">
          Вход
        </h3>
        <div className="m-4">
          <Form>
            <FormGroup>
              <Label for="email">Почта</Label>
              <Input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Пароль</Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <Button color="success" onClick={this.handleLogin}>
            	Войти
          	</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;