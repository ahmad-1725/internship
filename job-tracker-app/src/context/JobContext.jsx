import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const JobContext = React.createContext();

function JobProvider({children}) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // if jobs exist in local storage
    const storedJobs = localStorage.getItem("jobs");
    if(storedJobs){
      try{
        const parsedJobs = JSON.parse(storedJobs);
        setJobs(parsedJobs)
      } catch (error) {
        console.error("Failed to parse jobs:", error)
      }
    }
  }, []);

  useEffect(()=>{
    // add job to local stage everytime jobs change
    localStorage.setItem("jobs",JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    const newJob = {
      id: Date.now().toString(),
      ...job,
    };
   setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job)=> job.id !== id );
    
    setJobs(updatedJobs);
  }
  
  const updateJob = (id, updatedData) => {
    const updatedJobs = jobs.map((job) => 
      job.id === id ? { ...job, ...updatedData} : job
  );
    setJobs(updatedJobs);
  }

  const getJobById = (id) => {
    return jobs.find((job) => job.id === id) ;
  }

  return(
    <JobContext.Provider
      value = {{
        jobs,
        addJob,
        deleteJob,
        updateJob,
        getJobById,
        setJobs,
      }}
      >
        {children}
    </JobContext.Provider>
  );
}

export {JobProvider, JobContext};