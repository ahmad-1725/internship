import React, { useContext } from "react";
import { useState } from "react";
import { JobContext } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [status, setStatus] = useState('Applied');
  const [applicationDate, setApplicationDate] = useState('');
  const [notes, setNotes] = useState('');

  const { addJob } = useContext(JobContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyName || !jobTitle || !applicationDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(applicationDate);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      alert("Application date cannot be in the future.");
      return;
    }

    addJob({
      companyName,
      jobTitle,
      status,
      applicationDate,
      notes,
    });

    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-5 mb-5 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Company Name *</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Google"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Job Title *</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Frontend Developer"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Application Date *</label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={applicationDate}
            onChange={(e) => setApplicationDate(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Add any relevant notes about this job application..."
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded transition duration-200"
          >
            Save Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
