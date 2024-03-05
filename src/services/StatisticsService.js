import axios from "axios";

const API_URL = "/statistic";

class StatisticsService {
  getStatAllUsers(dateStart, dateEnd, projectID) {
    if (projectID === 0) {
      return axios.get(API_URL + `/project/all/${dateStart}/${dateEnd}`);
    }
    return axios.get(API_URL + `/project/${dateStart}/${dateEnd}/${projectID}`);
  }
}

const statisticsService = new StatisticsService();
export default statisticsService;