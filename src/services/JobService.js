import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "dictionary/job";

class JobService {
  getAllJobs() {
    return axios.get(API_URL + "/all", { headers: authHeader() });
  }

  getJob(jobId) {
    return axios.get(API_URL + `/${jobId}`, { headers: authHeader() })
  }

  putJob(job) {
    return axios.put(API_URL, job, { headers: authHeader() });
  }

  postJob(job) {
    return axios.post(API_URL, job, { headers: authHeader() });
  }

  deleteJob(job) {
    return axios.delete(API_URL + `/${job.job.id}`, { headers: authHeader() });
  }
}

const jobService = new JobService();
export default jobService;
