import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProjectsPage from "./pages/ProjectPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/projekte" replace />} />

                <Route path="/projekte" element={<ProjectsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
