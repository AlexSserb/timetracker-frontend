import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/timesheet/day";

class TimesheetService {
  getTimesheetsForCurrentDay(day) {
    return axios.get(API_URL + `/${day}`);
  }

  putTimesheet(timesheet) {
    return axios.put(API_URL + `/${timesheet.id}`, timesheet, { headers: authHeader() });
  }

  postTimesheet(timesheet) {
    return axios.post(API_URL, timesheet);
  }

  deleteTimesheet(timesheet) {
    return axios.delete(API_URL + `/${timesheet.id}`);
  }

  putTimesheetsFinished(timesheetIDs) {
    return axios
      .put(API_URL + "/finish", { "timesheetIDs": timesheetIDs })
  }
}

export default new TimesheetService();
