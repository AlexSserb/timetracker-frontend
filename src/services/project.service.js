import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "dictionary/project";

class ProjectService {
  getAllProjects() {
    alert(JSON.stringify(authHeader()));
    return axios.get(API_URL, { headers: authHeader() });
  }

  getStatOneUserByWeeks(monthDate, projectIDs, employeeID) {
    return axios.get(API_URL + "/employee", {
      "monthDate": monthDate,
      "projectIDs": projectIDs,
      "employeeID": employeeID
    }, { headers: authHeader() });
  }

  putProject(project) {
    return axios.put(API_URL, project, { headers: authHeader() });
  }

  postProject(project) {
    return axios.post(API_URL + `/${project.name}`, { headers: authHeader() });
  }

  deleteProject(project) {
    return axios.delete(API_URL + `/${project.id}`, { headers: authHeader() });
  }
}

export default new ProjectService();
