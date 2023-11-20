import axios from 'axios';

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(email, password) {
		alert(`email = ${email}, password = ${password}`)
    return axios
      .post(API_URL + "login", {
				"email": email,
				"password": password
			})
			.then(response => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
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
