import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "dictionary/user";

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  /* Returns objects of userAuth */
  getAllUsersAuth() {
    return axios.get("userAuth", { headers: authHeader() });
  }

  /* Post object of userAuth */
  postUserAuth(userAuth) {
    return axios.post("register", userAuth, { headers: authHeader() });
  }

  /* Put object of userAuth */
  putUserAuth(userAuth) {
    return axios.put("userAuth", userAuth, { header: authHeader() });
  }

  /* Resend the password for user with UserAuth data */
  resendPswUserAuth(userAuth) {
    return axios.post("/auth/resend", userAuth, { header: authHeader() });
  }

  /* Delete User object by User.ID */
  deleteUser(user) {
    return axios.delete(API_URL + `/${user.id}`, { headers: authHeader() });
  }
}

const userService = new UserService();
export default userService;
