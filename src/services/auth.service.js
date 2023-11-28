import axios from 'axios';

const API_URL = "http://localhost:8080/auth";

class AuthService {
  login(email, password) {
		alert(`email = ${email}, password = ${password}`)
    return axios
      .post(API_URL, {
				"username": email,
				"password": password
			});
  }

	logout() {
		localStorage.removeItem("user");
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	}
}

export default new AuthService();
