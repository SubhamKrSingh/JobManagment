import { useForm } from "react-hook-form";
import { useJobContext } from "../context/JobContext";
import { createJob } from "../api/jobApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

export default function JobForm() {
  const { register, handleSubmit, reset,setValue } = useForm();
  
  const { dispatch } = useJobContext();
  const navigate = useNavigate();

  useEffect(() => {
    const savedDraft = localStorage.getItem("jobDraft");
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      for (let key in draft) {
        if (typeof draft[key] === "object") {
          for (let subKey in draft[key]) {
            setValue(`salary.${subKey}`, draft[key][subKey]);
          }
        } else {
          setValue(key, draft[key]);
        }
      }
    }
  }, [setValue]);
  
  const onSubmit = async (data) => {
    try {
      const response = await createJob(data);
      dispatch({ type: "ADD_JOB", payload: response.data });
      reset();
      alert("Job created");
    } catch {
      alert("Error creating job");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 z-50 backdrop-blur-xs scale-95">
    <div className="bg-white bg-opacity-90 backdrop-blur-md max-w-3xl mx-auto  p-6 rounded-xl shadow-lg text-gray-600 text-sm">
    <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-black"
        >
          &times;
        </button>
      <h2 className="text-xl font-semibold text-center mb-6">Create Job Opening</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="hover:text-black">
            <label className="block text-md font-medium mb-1">Job Title</label>
            <input
              type="text"
              {...register("jobtitle")}
              required
              placeholder="Full Stack Developer"
              className="w-full border px-3 py-3 rounded-md"
            />
          </div>
          <div className="hover:text-black">
            <label className="block text-md font-medium mb-1">Company Name</label>
            <input
              type="text"
              {...register("company")}
              required
              placeholder="Amazon, Swiggy"
              className="w-full border px-3 py-3 rounded-md"
            />
          </div>
          <div className="hover:text-black">
            <label className="block text-md font-medium mb-1">Location</label>
            <select
              {...register("location")}
              required
              className="w-full border px-3 py-3 rounded-md"
            >
              <option value="">Choose Preferred Location</option>
              <option value="Remote">Remote</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
          <div className="hover:text-black">
            <label className="block text-md font-medium mb-1">Job Type</label>
            <select
              {...register("type")}
              required
              className="w-full border px-3 py-3 rounded-md"
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="hover:text-black">
            <label className="block text-md font-medium mb-1">Salary</label>
            <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              {...register("salary.min")}
              required
              placeholder="₹0"
              className="w-full border px-3 py-3 rounded-md"
            />
             <input
              type="number"
              {...register("salary.max")}
              required
              placeholder="₹120000"
              className="w-full border px-3 py-3 rounded-md"
            />
            </div>
          </div>
          <div className="hover:text-black">
            <label className="block text-md font-medium mb-1">Application Deadline</label>
            <input
              type="date"
              {...register("deadline")}
              required
              className="w-full border px-3 py-3 rounded-md"
            />
          </div>
        </div>
 
        <div className="hover:text-black">
          <label className="block text-md  font-medium mb-1">Job Description</label>
          <textarea
            {...register("description")}
            required
            placeholder="Please share a description to let the candidate know more about the job role"
            className="w-full border px-3 py-3 rounded-md h-28 resize-none"
          ></textarea>
        </div>

        <div className="flex justify-between mt-4">
        <button
  type="button"
  className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100"
  onClick={() => {
    const formData = {
      jobtitle: document.querySelector('[name="jobtitle"]').value,
      company: document.querySelector('[name="company"]').value,
      location: document.querySelector('[name="location"]').value,
      type: document.querySelector('[name="type"]').value,
      salary: {
        min: document.querySelector('[name="salary.min"]').value,
        max: document.querySelector('[name="salary.max"]').value,
      },
      deadline: document.querySelector('[name="deadline"]').value,
      description: document.querySelector('[name="description"]').value,
    };
    localStorage.setItem("jobDraft", JSON.stringify(formData));
    alert("Draft saved successfully");
  }}
>
  Save Draft
</button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Publish »
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
