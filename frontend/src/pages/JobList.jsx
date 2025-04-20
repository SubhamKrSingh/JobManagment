import JobCard from "../components/JobCard";

export default function JobList({ jobs }) {
 const reversejobs=jobs.reverse();
    return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 items-center justify-center">
      {reversejobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}
