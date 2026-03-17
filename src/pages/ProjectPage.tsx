import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getProjects } from "../api/projects";
import { hexToImageUrl } from "../utils/image";

import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import AllProjectsButton from "../components/AllProjectsButton";
import ProjectsList from "../components/ProjectList.tsx";

import "../css/project-page.css";
import type { Category, Project } from "../types/database.ts";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200";

export default function ProjectsPage() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        Promise.all([getProjects(), getCategories()])
            .then(([p, c]) => {
                setProjects(p as Project[]);
                setCategories(c as Category[]);
            })
            .catch(err => console.error("Fehler beim Laden:", err));
    }, []);

    if (projects.length === 0) return <p className="loading">Lade Projekte …</p>;

    // Filter auf status_id 2 (als Zahl)
    // Falls deine DB-Spalte wirklich "staus_id" ohne 't' heißt,
    // dann ändere es hier zurück, aber lass den Vergleich bei == (oder Typ number).
    const published = projects.filter(p => Number(p.status_id) === 2);

    const [featured, ...rest] = published;

    const filtered = rest.filter(p => {
        if (selectedCategory && p.category_id !== selectedCategory) return false;
        if (selectedDate && new Date(p.created_at).toLocaleDateString("de-DE") !== selectedDate) return false;
        return true;
    });

    const visible = showAll ? filtered : filtered.slice(0, 4);

    const featuredImageUrl = (featured && featured.image)
        ? hexToImageUrl(featured.image) || DEFAULT_IMAGE
        : DEFAULT_IMAGE;

    return (
        <>
            <Navbar />
            <div className="projects-page">
                <h1>Projekte & Entwicklungen in Leibnitz</h1>

                <Filters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    dates={[...new Set(published.map(p =>
                        new Date(p.created_at).toLocaleDateString("de-DE")
                    ))]}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                />

                {featured ? (
                    <div className="featured-card">
                        <div
                            className="featured-image"
                            style={{ backgroundImage: `url(${featuredImageUrl})` }}
                        >
                            <div className="featured-date">
                                {new Date(featured.created_at).toLocaleDateString("de-DE")}
                            </div>
                            <div className="featured-content">
                                <div className="featured-text-group">
                                    <h2>{featured.titel}</h2>
                                    <p>{featured.text.substring(0, 160)}…</p>
                                </div>
                                <button
                                    className="details-btn featured-details-btn"
                                    onClick={() => navigate(`/projekte/${featured.id}`)}
                                >
                                    Mehr Details →
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Aktuell keine veröffentlichten Projekte verfügbar.</p>
                )}

                <div className="projects-header">
                    <span />
                    <AllProjectsButton
                        show={!showAll && filtered.length > 4}
                        onClick={() => setShowAll(true)}
                    />
                </div>

                <ProjectsList projects={visible} />
            </div>
        </>
    );
}