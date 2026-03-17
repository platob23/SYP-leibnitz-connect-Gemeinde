import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProjectsPage from "./pages/ProjectPage.tsx";
import StartPage from "./pages/StartPage.tsx";
import RathausPage from "./pages/RathausPage.tsx";
import AmtstafelPage from "./pages/AmtstafelPage.tsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";
import ContactPage from "./pages/ContactPage.tsx"; // Neu importiert

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/projekte" replace />} />
                <Route path="/start" element={<StartPage/>} />
                <Route path="/rathaus" element={<RathausPage/>} />
                <Route path="/amtstafel" element={<AmtstafelPage/>} />
                <Route path="/projekte" element={<ProjectsPage/>} />
                <Route path="/projekte/:id" element={<ProjectDetailPage />} />
                <Route path="/projekte/:id/kontakt" element={<ContactPage />} />
            </Routes>
        </BrowserRouter>
    );
}