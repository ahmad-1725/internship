import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import JobDetails from "./pages/JobDetails";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/job/:id" element={<JobDetails/>} />
          <Route path="/edit/:id" element={<EditJob/>}  />
          <Route path="*" element={<div className="p-4 text-red-500">Page Not Found</div>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
