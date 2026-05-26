import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../api/supabaseClient";
import { hexToImageUrl } from "../utils/image";
import Navbar from "../components/Navbar";
import type { Project } from "../types/database";
import "../css/contact-page.css";
import {addFormular} from "../api/projects.ts";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200";

export default function ContactPage() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [newsletter, setNewsletter] = useState(false);

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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message || !emailRegex.test(email)) {
            return;
        }

        console.log("Wird gespeichert...");

        try {
            await addFormular({
                project_id: id ? Number(id) : null,
                name,
                email,
                phone: phone || undefined,
                message,
                newsletter,
            });
            console.log("Erfolgreich gespeichert!");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setNewsletter(false);
            setSubmitted(false);
        } catch (err) {
            console.error("Fehler:", err);
        }
    }

    return (
        <>
            <Navbar />
            <div className="contact-page">
                <h1>Projekte & Entwicklungen in Leibnitz</h1>
                <div className="contact-container">
                    <div className="contact-image-wrapper">
                        <img
                            src={imageUrl}
                            alt={project?.titel || "Projektbild"}
                            className="contact-main-image"
                        />
                    </div>

                    <div className="contact-form-wrapper">
                        <form
                            className={`contact-form ${submitted ? "was-submitted" : ""}`}
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <input
                                type="text"
                                placeholder="Ihr Name"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Ihre Email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Ihre Telefonnummer"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            <textarea
                                placeholder="Ihre Nachricht"
                                rows={5}
                                required
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            ></textarea>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="news"
                                    checked={newsletter}
                                    onChange={e => setNewsletter(e.target.checked)}
                                />
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