import axios from "axios";

const API_URL = "/dictionary/project";

class ProjectService {
  getAllActiveProjects() {
    return axios.get(API_URL + "all/true");
  }

  getProject(projectId) {
    return axios.get(API_URL + `/${projectId}`)
  }

  getUsersForProject(projectId) {
    return axios.get(API_URL + `/${projectId}/usersList`);
  }

  getStatOneUserByWeeks(monthDate, projectIDs, employeeID) {
    let data = {
      "monthDate": monthDate,
      "projectIDs": projectIDs,
      "employeeID": employeeID
    };

    return axios.post(API_URL + "/employee", data);
  }

  putProject(project) {
    return axios.put(API_URL, project);
  }

  postProject(project) {
    return axios.post(API_URL, project);
  }

  deleteProject(project) {
    return axios.delete(API_URL + `/${project.id}`);
  }
}

const projectService = new ProjectService();
export default projectService;
