import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "timesheet/day";

class TimesheetService {
  getTimesheetsForCurrentDay(day) {
    return axios.get(API_URL + `/${day}`, { headers: authHeader() });
  }

  putTimesheet(timesheet) {
    return axios.put(API_URL + `/${timesheet.id}`, timesheet, { headers: authHeader() });
  }

  postTimesheet(timesheet) {
    return axios.post(API_URL, timesheet, { headers: authHeader() });
  }

  deleteTimesheet(timesheet) {
    return axios.delete(API_URL + `/${timesheet.id}`, { headers: authHeader() });
  }

  putTimesheetsFinished(timesheetIDs) {
    return axios
      .put(API_URL + "/finish", { "timesheetIDs": timesheetIDs }, { headers: authHeader() })
  }
}

const timesheetSevice = new TimesheetService();
export default timesheetSevice;
