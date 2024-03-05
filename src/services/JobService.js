import axios from "axios";

const API_URL = "/dictionary/job";

class JobService {
  getAllJobs() {
    return axios.get(API_URL + "/all");
  }

  getJob(jobId) {
    return axios.get(API_URL + `/${jobId}`);
  }

  putJob(job) {
    return axios.put(API_URL, job);
  }

  postJob(job) {
    return axios.post(API_URL, job);
  }

  deleteJob(job) {
    return axios.delete(API_URL + `/${job.job.id}`);
  }
}

const jobService = new JobService();
export default jobService;
