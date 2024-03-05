import axios from "axios";

const API_URL = "/timesheet/day";

class TimesheetService {
  getTimesheetsForCurrentDay(day) {
    return axios.get(API_URL + `/${day}`);
  }

  putTimesheet(timesheet) {
    return axios.put(API_URL + `/${timesheet.id}`, timesheet);
  }

  postTimesheet(timesheet) {
    return axios.post(API_URL, timesheet);
  }

  deleteTimesheet(timesheet) {
    return axios.delete(API_URL + `/${timesheet.id}`);
  }

  putTimesheetsFinished(timesheetIDs) {
    return axios
      .put(API_URL + "/finish", { "timesheetIDs": timesheetIDs });
  }
}

const timesheetSevice = new TimesheetService();
export default timesheetSevice;
