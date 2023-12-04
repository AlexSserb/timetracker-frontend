import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "dictionary/user";

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

//   putProject(project) {
//     return axios.put(API_URL, project);
//   }

//   postProject(project) {
//     return axios.post(API_URL + `/${project.name}`);
//   }

//   deleteProject(project) {
//     return axios.delete(API_URL + `/${project.id}`);
//   }
}

const userService = new UserService();
export default userService;
