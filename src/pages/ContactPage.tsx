import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../api/supabaseClient";
import { hexToImageUrl } from "../utils/image";
import Navbar from "../components/Navbar";
import type { Project } from "../types/database";
import "../css/contact-page.css";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200";

export default function ContactPage() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        async function fetchProject() {
            const { data, error } = await supabase
                .from("Project")
                .select("titel, image")
                .eq("id", id)
                .single();

            if (!error && data) {
                setProject(data as Project);
            }
        }
        if (id) fetchProject();
    }, [id]);

    const imageUrl = project?.image
        ? hexToImageUrl(project.image) || DEFAULT_IMAGE
        : DEFAULT_IMAGE;

    return (
        <>
            <Navbar />
            <div className="contact-page">
                <h1>Projekte & Entwicklungen in Leibnitz</h1>
                <div className="contact-container">
                    {/* Linke Seite: Bild aus der Datenbank */}
                    <div className="contact-image-wrapper">
                        <img
                            src={imageUrl}
                            alt={project?.titel || "Projektbild"}
                            className="contact-main-image"
                        />
                    </div>

                    {/* Rechte Seite: Formular */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form">
                            <input type="text" placeholder="Ihr Name" required />
                            <input type="email" placeholder="Ihre Email" required />
                            <input type="tel" placeholder="Ihre Telefonnummer" />
                            <textarea placeholder="Ihre Nachricht" rows={5} required></textarea>

                            {/* Checkbox LINKS vom Text, Container LINKSBÜNDIG */}
                            <div className="checkbox-group">
                                <input type="checkbox" id="news" />
                                <label htmlFor="news">Benachrichtigen Sie mich bei Neuigkeiten</label>
                            </div>

                            <button type="submit" className="submit-btn">Absenden</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}