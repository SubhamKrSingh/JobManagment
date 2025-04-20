import { useState, useEffect } from "react";
import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"];

export default function JobFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");
  const [salary, setSalary] = useState([5000, 50000]);

  
  useEffect(() => {
    onFilter({ search, type, location, salary });
  }, [search, type, location, salary]);

  return (
    <div className="grid md:grid-cols-4  lg:grid-cols-4 items-center justify-between gap-4 bg-white px-6 py-4 rounded-xl shadow-md w-full">
    
      <div className="flex items-center border-r-1 border-gray-400 px-3 py-2  w-full max-w-xs">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          className="ml-2 outline-none w-full border-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

 
      <div className="flex items-center border-r-1 border-gray-400 px-3 py-2 w-full max-w-xs">
        <MapPinIcon className="h-5 w-5 text-gray-400" />
        <select
          className="ml-2 outline-none w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Preferred Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      
      <div className="flex items-center border-r-1 border-gray-400 px-3 py-2 w-full max-w-xs">
        <span className="text-gray-500 mr-2">👤</span>
        <select
          className="outline-none w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {jobTypes.map((jt) => (
            <option key={jt} value={jt}>
              {jt}
            </option>
          ))}
        </select>
      </div>

    
      <div className="flex flex-col w-full max-w-xs">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Salary Per Month</span>
          <span>₹{salary[0]} – ₹{salary[1]}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100000"
            step="500"
            value={salary[0]}
            onChange={(e) =>
              setSalary([+e.target.value, Math.max(+e.target.value, salary[1])])
            }
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="100000"
            step="500"
            value={salary[1]}
            onChange={(e) =>
              setSalary([Math.min(salary[0], +e.target.value), +e.target.value])
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
