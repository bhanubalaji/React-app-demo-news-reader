import { Routes, Route,Navigate,Router } from "react-router-dom";
import Dashboard from "../components/Dashboard/dashboard";
import UploadContent from "../components/uploadContent/UploadContent";
import ProtectedRoute from './ProtectedRoute';

function PageRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="/home" element={<ProtectedRoute element={<Dashboard />} />} />
    <Route path="/uploadContent" element={<ProtectedRoute element={<UploadContent />} />} />
    {/* Add other routes here */}
  </Routes>
  );
}
export default PageRoutes;