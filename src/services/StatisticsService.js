import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "statistic";

class StatisticsService {
  getStatAllUsers(dateStart, dateEnd, projectID) {
    if (projectID === 0) {
      return axios.get(API_URL + `/project/all/${dateStart}/${dateEnd}`, { headers: authHeader() });
    }
    return axios.get(API_URL + `/project/${dateStart}/${dateEnd}/${projectID}`, { headers: authHeader() });
  }
}

const statisticsService = new StatisticsService();
export default statisticsService;