import { BriefcaseIcon, MapPinIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';


function timeAgo(timestamp) {
  const now = Date.now();
  const posted = new Date(timestamp).getTime();
  const diffMs = now - posted;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}


export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 md:w-full lg:w-full w-[300px] max-w-md">

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
            alt="Company Logo"
            className="h-10 w-10 rounded-md object-contain"
          />
          <span className="text-sm text-gray-500">{job.company}</span>
        </div>
        <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-1 rounded-full">{timeAgo(job.createdAt)}</span>
      </div>

   
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{job.jobtitle}</h2>
      <div className="text-xs text-gray-500">{job.type}</div>
  
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <BriefcaseIcon className="h-4 w-4 text-gray-400" />
          <span>1–3 yr Exp</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPinIcon className="h-4 w-4 text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <CurrencyRupeeIcon className="h-4 w-4 text-gray-400" />
          <span>{job.salary?.min}–{job.salary?.max}</span> 
        </div>
      </div>

    
      <ul className="text-sm text-gray-600 space-y-1 mb-4">
        <li className="truncate">• {job.description}</li>
       
      </ul>

  
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition">
        Apply Now
      </button>
    </div>
  );
}
