import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/dictionary/project";

class ProjectService {
  getAllProjects() {
    return axios.get(API_URL);
  }

  putProject(project) {
    return axios.put(API_URL, project);
  }

  postProject(project) {
    return axios.post(API_URL + `/${project.name}`);
  }

  deleteProject(project) {
    return axios.delete(API_URL + `/${project.id}`);
  }
}

export default new ProjectService();
