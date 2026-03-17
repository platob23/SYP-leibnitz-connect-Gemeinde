import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import type { Project } from "../types/database";
import { hexToImageUrl } from "../utils/image";
import { supabase } from "../api/supabaseClient.ts";
import "../css/project-detail.css";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200";

export default function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        async function fetchProject() {
            const { data, error } = await supabase
                .from("Project")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Fehler beim Laden des Projekts:", error);
            } else {
                setProject(data as Project);
            }
        }

        if (id) fetchProject();
    }, [id]);

    if (!project) {
        return (
            <>
                <Navbar />
                <div className="project-detail-page">
                    <p className="loading">Lade Projektdetails...</p>
                </div>
            </>
        );
    }

    const imageUrl = project.image
        ? hexToImageUrl(project.image) || DEFAULT_IMAGE
        : DEFAULT_IMAGE;

    return (
        <>
            <Navbar />
            <div className="project-detail-page">
                <h1>Projekte & Entwicklungen in Leibnitz</h1>
                <div className="detail-container">
                    <div
                        className="detail-image"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    <div className="detail-content">
                        <h2>{project.titel}</h2>
                        <p className="detail-short-text">{project.text}</p>
                        <div className="detail-long-text">
                            {project.large_description || "Keine ausführliche Beschreibung vorhanden."}
                        </div>
                        <button
                            className="rate-btn"
                            onClick={() => navigate(`/projekte/${project.id}/kontakt`)}
                        >
                            Bewerten
                        </button>
                        <div className="rating-icons">
                            <span role="img" aria-label="like">👍</span>
                            <span role="img" aria-label="dislike">👎</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}