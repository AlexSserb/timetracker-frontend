import axios from 'axios';

const API_URL = "http://localhost:8080/auth";

class AuthService {
  login(email, password) {
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

	isManagerCurrUser() {
		let user = JSON.parse(localStorage.getItem("user"));
		return user && user.manager;
	}
}

const authService = new AuthService();
export default authService;
