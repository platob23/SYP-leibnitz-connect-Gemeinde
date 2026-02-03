import { useEffect, useState } from "react";
import type { Project } from "../types/database";
import { getProjects } from "../api/projects";

import "./ProjectPage.css"

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch((err) => {
                console.error(err);
                setError("Fehler beim Laden");
            });
    }, []);

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (projects.length === 0) {
        return <p className="loading">Lade Projekte …</p>;
    }

    const [featured, ...rest] = projects;

    const getImage = (p: Project) =>
        p.image_url && p.image_url.trim() !== ""
            ? p.image_url
            : DEFAULT_IMAGE;

    return (
        <div className="projects-page">
            <h1>Projekte & Entwicklungen in Leibnitz</h1>

            {/* 🔹 Featured Projekt */}
            <div className="featured-card">
                <div
                    className="featured-image"
                    style={{
                        backgroundImage: `url(${getImage(featured)})`,
                    }}
                >
                    <div className="featured-content">
                        <h2>{featured.titel}</h2>
                        <p>{featured.text?.substring(0, 160)}…</p>
                        <button className="details-btn">Mehr Details →</button>
                    </div>
                </div>
            </div>

            {/* 🔹 Grid */}
            <div className="projects-grid">
                {rest.map((project) => (
                    <div key={project.id} className="project-card">
                        <div
                            className="card-image"
                            style={{
                                backgroundImage: `url(${getImage(project)})`,
                            }}
                        />
                        <div className="card-content">
                            <h3>{project.titel}</h3>
                            <p className="date">
                                {new Date(project.created_at).toLocaleDateString("de-DE")}
                            </p>
                            <button className="details-btn small">
                                Mehr Details →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
