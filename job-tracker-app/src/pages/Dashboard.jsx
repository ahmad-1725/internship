import React, { useState, useContext } from "react";
import { JobContext } from "../context/JobContext";
import { Link } from "react-router-dom";
import { toggleDarkMode } from '../utils/theme';

const Dashboard = () => {
  const { jobs, setJobs } = useContext(JobContext);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const handleToggleDark = () => {
    toggleDarkMode();
    setIsDark((prev) => !prev);
  };

  const handleExport = () => {
    const json = JSON.stringify(jobs, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "job-applications.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!Array.isArray(parsed)) {
          alert("Invalid file format. Expected an array of jobs.");
          return;
        }

        const isValid = parsed.every((job) =>
          job.companyName && job.jobTitle && job.applicationDate && job.status
        );
        if (!isValid) {
          alert("Some job entries are missing required fields.");
          return;
        }

        const confirm = window.confirm("Importing will replace current jobs. Continue?");
        if (!confirm) return;

        setJobs(parsed);
        alert("Jobs imported successfully!");
      } catch (err) {
        alert("Failed to read file.");
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  const filteredJobs = jobs.filter((job) => {
    const statusMatch = statusFilter === "All" || job.status === statusFilter;
    const searchMatch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10">
        <div className="text-4xl font-extrabold mb-10 tracking-tight text-center select-none">
          My Job Applications
        </div>

        {/* Button Row */}
       <div className="mb-10 flex flex-wrap items-center gap-5">
  <Link
    to="/add"
    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-[0.5deg]"
  >
    Add New Job
  </Link>

  <button
    onClick={handleExport}
    className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-black text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-[-0.5deg]"
  >
    <span>📤</span>
    Export Jobs
  </button>

  <button
    onClick={() => document.getElementById("importFile").click()}
    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-[0.5deg]"
  >
    <span>📥</span>
    Import Jobs
  </button>

  <input
    id="importFile"
    onChange={handleImport}
    type="file"
    accept=".json"
    className="hidden"
  />

  <input
    type="text"
    placeholder="Search by company or job title"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="flex-grow border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-3 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition duration-300"
  />

  <button
    onClick={() => setSearchTerm("")}
    className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-rotate-[0.5deg]"
  >
    Clear
  </button>

  <select
    onChange={(e) => setStatusFilter(e.target.value)}
    value={statusFilter}
    className="ml-auto border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm px-5 py-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 dark:text-gray-100 transition duration-300"
  >
    <option value="All">All</option>
    <option value="Applied">Applied</option>
    <option value="Interviewing">Interviewing</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  </select>
</div>


        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-20 select-none">
            No jobs to show.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/job/${job.id}`}
                className="block border border-gray-300 dark:border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300 transform hover:scale-[1.01]"
              >
                <h2 className="text-2xl font-semibold mb-3">{job.jobTitle}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  <strong>Company:</strong> {job.companyName}
                </p>
                <p className="flex items-center gap-4 mb-3">
                  <strong>Status:</strong>
                  <span
                    className={`inline-block px-4 py-1 text-sm font-semibold rounded-full
                    ${
                      job.status === "Applied"
                        ? "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        : job.status === "Interviewing"
                        ? "bg-blue-300 text-blue-900 dark:bg-blue-700 dark:text-blue-100"
                        : job.status === "Offer"
                        ? "bg-green-300 text-green-900 dark:bg-green-700 dark:text-green-100"
                        : job.status === "Rejected"
                        ? "bg-red-300 text-red-900 dark:bg-red-700 dark:text-red-100"
                        : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-light">
                  <strong>Applied On:</strong> {job.applicationDate}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
