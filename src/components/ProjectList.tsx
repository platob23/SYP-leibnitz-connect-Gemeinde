import { useNavigate } from "react-router-dom";
import type { Project } from "../types/database";
import { hexToImageUrl } from "../utils/image";
import "../css/project-page.css";

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200";

type Props = {
    projects: Project[];
};

export default function ProjectsList({ projects }: Props) {
    const navigate = useNavigate();

    const getImage = (p: Project) =>
        p.image ? hexToImageUrl(p.image) || DEFAULT_IMAGE : DEFAULT_IMAGE; // <-- fix

    return (
        <div className="projects-flex">
            {projects.map((p) => (
                <div key={p.id} className="project-card">
                    <div
                        className="card-image"
                        style={{ backgroundImage: `url(${getImage(p)})` }}
                    />
                    <div className="card-content">
                        <h3>{p.titel}</h3>
                        <p className="card-text">
                            {p.text.length > 120 ? p.text.slice(0, 120) + "..." : p.text}
                        </p>
                        <p className="date">
                            {new Date(p.created_at).toLocaleDateString("de-DE")}
                        </p>
                        <button
                            className="details-btn"
                            onClick={() => navigate(`/projekte/${p.id}`)}
                        >
                            Mehr Details →
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}