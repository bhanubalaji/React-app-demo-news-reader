import { Routes, Route,Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/dashboard";
import UploadContent from "../components/uploadContent/UploadContent";

function PageRoutes() {
    return (

            <>
           
            <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/uploadContent" element={<UploadContent />}></Route>

        </Routes></>
    );
}
export default PageRoutes;