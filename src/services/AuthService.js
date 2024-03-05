import axios from 'axios';


class AuthService {
  login(email, password) {
    return axios
      .post('/auth', {
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
