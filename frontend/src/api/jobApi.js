import axios from "axios";

const API = axios.create({
    baseURL : "https://tasks-0oou.onrender.com/api/job"
})

export const createJob = (jobData) => API.post("/create-company",jobData);

export const getJobs = () => API.get("/companies")
