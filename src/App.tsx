import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProjectsPage from "./pages/ProjectPage.tsx";
import StartPage from "./pages/StartPage.tsx"
import RathausPage from "./pages/RathausPage.tsx"
import AmtstafelPage from "./pages/AmtstafelPage.tsx"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/projekte" replace />} />
                <Route path="/start" element={<StartPage/>} />
                <Route path="/rathaus" element={<RathausPage/>} />
                <Route path="/amtstafel" element={<AmtstafelPage/>} />
                <Route path="/projekte" element={<ProjectsPage/>} />
            </Routes>
        </BrowserRouter>
    );
}
