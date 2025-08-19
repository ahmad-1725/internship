import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobContext } from "../context/JobContext";

const JobDetails = () => {
  const { id } = useParams();
  const { getJobById, deleteJob } = useContext(JobContext);
  const navigate = useNavigate();

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="p-6 max-w-md mx-auto mt-20 text-red-600 font-semibold text-center select-none">
        Job not found.
      </div>
    );
  }

  const handleDelete = (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      deleteJob(jobId);
      navigate("/");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-xl rounded-3xl border border-gray-300 dark:border-gray-700">
      <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8 text-center select-none">
        {job.jobTitle}
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Company:</span>
          <span className="text-right text-lg font-medium">{job.companyName}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Application Date:</span>
          <span className="text-lg">{job.applicationDate}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Status:</span>
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full shadow-sm
              ${
                job.status === "Applied"
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                  : job.status === "Interviewing"
                  ? "bg-blue-200 text-blue-900 dark:bg-blue-700 dark:text-blue-100"
                  : job.status === "Offer"
                  ? "bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-100"
                  : job.status === "Rejected"
                  ? "bg-red-200 text-red-900 dark:bg-red-700 dark:text-red-100"
                  : "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
              }`}
          >
            {job.status}
          </span>
        </div>

        {job.notes && (
          <div>
            <p className="font-semibold mb-2 text-lg">Notes:</p>
            <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 whitespace-pre-line shadow-inner text-gray-800 dark:text-gray-200">
              {job.notes}
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-center gap-8">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          Edit Job
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-400 dark:focus:ring-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          Delete Job
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
