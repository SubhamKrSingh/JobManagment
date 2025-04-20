import { useEffect, useState } from "react";
import { useJobContext } from "../context/JobContext";
import { getJobs } from "../api/jobApi";
import JobFilter from "../components/JobFilter";
import JobList from "./JobList";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Home() {
  const { state, dispatch } = useJobContext();
  const [filteredJobs, setFilteredJobs] = useState([]);


  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await getJobs();
        dispatch({ type: "SET_JOBS", payload: res.data });
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    }
    fetchJobs();
  }, [dispatch]);

  
  useEffect(() => {
    setFilteredJobs(state.jobs);
  }, [state.jobs]);

  const handleFilter = ({ search, type, location, salary }) => {
    let filtered = [...state.jobs];

    if (type && type !== "All") {
      filtered = filtered.filter((job) =>
        job.type?.toLowerCase() === type.toLowerCase()
      );
    }

    if (location) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (search) {
      filtered = filtered.filter((job) =>
        job.jobtitle?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (salary?.length === 2) {
      const [min, max] = salary;
      filtered = filtered.filter((job) => {
        return job.salary?.min <= max && job.salary?.max >= min;
      });
    }

    setFilteredJobs(filtered);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">All Jobs</h2>
        <JobFilter onFilter={handleFilter} />
        <div className="mt-6 space-y-4">
          {filteredJobs.length > 0 ? (
            <JobList jobs={filteredJobs} />
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>

     
      <Outlet />
    </>
  );
}
