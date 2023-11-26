import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/statistic";

class StatisticsService {
  getStatAllUsers(dateStart, dateEnd, projectId) {
    return axios
    	.get(API_URL + `/${dateStart}/${dateEnd}` + 
      (projectId !== 0 ? `/${projectId}` : ''))
  }
}

export default new StatisticsService();