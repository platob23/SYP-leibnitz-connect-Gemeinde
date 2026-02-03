import { useEffect, useState } from "react";
import { getCategories, getProjects } from "../api/projects";
import type { Project, Category } from "../types/database";

import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import AllProjectsButton from "../components/AllProjectsButton";
import ProjectsList from "../components/ProjectList.tsx";

import "../css/project-page.css";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        Promise.all([getProjects(), getCategories()])
            .then(([p, c]) => {
                setProjects(p);
                setCategories(c);
            });
    }, []);

    console.log("Meine Kategorien aus der DB:", categories);

    if (projects.length === 0) return <p className="loading">Lade Projekte …</p>;

    const [featured, ...rest] = projects;

    const filtered = rest.filter(p => {
        if (selectedCategory && p.category_id !== selectedCategory) return false;
        if (selectedDate && new Date(p.created_at).toLocaleDateString("de-DE") !== selectedDate) return false;
        return true;
    });

    const visible = showAll ? filtered : filtered.slice(0, 4);

    const featuredImage = (featured.image_url && featured.image_url.trim() !== "")
        ? featured.image_url
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
                    dates={[...new Set(projects.map(p =>
                        new Date(p.created_at).toLocaleDateString("de-DE")
                    ))]}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                />

                <div className="featured-card">
                    <div
                        className="featured-image"
                        style={{ backgroundImage: `url(${featuredImage})` }}
                    >
                        <div className="featured-content">
                            <h2>{featured.titel}</h2>
                            <p>{featured.text.substring(0, 160)}…</p>
                        </div>
                    </div>
                </div>

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