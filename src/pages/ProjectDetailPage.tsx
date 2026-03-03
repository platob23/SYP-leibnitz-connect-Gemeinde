import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import type { Project } from "../types/database";
import "../css/project-detail.css";
import {supabase} from "../api/supabaseClient.ts";

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200";

export default function ProjectDetailPage() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        async function fetchProject() {
            const { data, error } = await supabase
                .from("Project")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error(error);
            } else {
                setProject(data);
            }
        }

        if (id) fetchProject();
    }, [id]);

    if (!project) {
        return (
            <>
                <Navbar />
                <div className="project-detail-page">
                    <p>Lade Projekt...</p>
                </div>
            </>
        );
    }

    const image =
        project.image_url && project.image_url.trim() !== ""
            ? project.image_url
            : DEFAULT_IMAGE;

    return (
        <>
            <Navbar />

            <div className="project-detail-page">
                <h1>Projekte & Entwicklungen in Leibnitz</h1>

                <div className="detail-container">
                    {/* LINKES BILD */}
                    <div
                        className="detail-image"
                        style={{ backgroundImage: `url(${image})` }}
                    />

                    {/* RECHTE SEITE */}
                    <div className="detail-content">
                        <h2>{project.titel}</h2>

                        {/* Kurzbeschreibung */}
                        <p className="detail-short-text">
                            {project.text}
                        </p>

                        {/* Langbeschreibung */}
                        <div className="detail-long-text">
                            {project.large_description ||
                                "Keine ausführliche Beschreibung vorhanden."}
                        </div>

                        <button className="rate-btn">
                            Bewerten →
                        </button>

                        <div className="rating-icons">
                            <span>👍</span>
                            <span>👎</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}