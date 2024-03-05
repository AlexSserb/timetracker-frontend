import axios from "axios";

const API_URL = "/dictionary/user";

class UserService {
  getAllUsers() {
    return axios.get(API_URL);
  }

  /* Returns objects of userAuth */
  getAllUsersAuth() {
    return axios.get("userAuth");
  }

  /* Post object of userAuth */
  postUserAuth(userAuth) {
    return axios.post("register", userAuth);
  }

  /* Put object of userAuth */
  putUserAuth(userAuth) {
    return axios.put("userAuth", userAuth);
  }

  /* Resend the password for user with UserAuth data */
  resendPswUserAuth(userAuth) {
    return axios.post("/auth/resend", userAuth);
  }

  /* Delete User object by User.ID */
  deleteUser(user) {
    return axios.delete(API_URL + `/${user.id}`);
  }
}

const userService = new UserService();
export default userService;
