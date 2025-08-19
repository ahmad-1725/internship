import React, { useEffect, useState, useContext } from "react";
import { JobContext } from "../context/JobContext";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, updateJob } = useContext(JobContext);

  const job = getJobById(id);

  useEffect(() => {
    if (!job) {
      alert("Job not found!");
      navigate("/");
    }
  }, [job, navigate]);

  const [jobTitle, setJobTitle] = useState(job?.jobTitle || "");
  const [companyName, setCompanyName] = useState(job?.companyName || "");
  const [status, setStatus] = useState(job?.status || "");
  const [applicationDate, setApplicationDate] = useState(job?.applicationDate || "");
  const [notes, setNotes] = useState(job?.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    if (applicationDate > today) {
      alert("Application date cannot be in the future.");
      return;
    }

    const updatedJob = {
      jobTitle,
      companyName,
      status,
      applicationDate,
      notes,
    };

    updateJob(id, updatedJob);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white mt-5 mb-5 shadow-md rounded-lg w-full max-w-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Job</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Application Date</label>
            <input
              type="date"
              value={applicationDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setApplicationDate(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
