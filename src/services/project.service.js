import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "dictionary/project";

class ProjectService {
  getAllProjects() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getProject(projectId) {
    return axios.get(API_URL + `/${projectId}`, { headers: authHeader() })
  }

  getUsersForProject(projectId) {
    return axios.get(API_URL + `/${projectId}/usersList`, { headers: authHeader() });
  }

  getStatOneUserByWeeks(monthDate, projectIDs, employeeID) {
    let data = {
      "monthDate": monthDate,
      "projectIDs": projectIDs,
      "employeeID": employeeID
    };

    return axios.post(API_URL + "/employee", data, { headers: authHeader() });
  }

  putProject(project) {
    return axios.put(API_URL, project, { headers: authHeader() });
  }

  postProject(project) {
    return axios.post(API_URL, project, { headers: authHeader() });
  }

  deleteProject(project) {
    return axios.delete(API_URL + `/${project.id}`, { headers: authHeader() });
  }
}

const projectService = new ProjectService();
export default projectService;
