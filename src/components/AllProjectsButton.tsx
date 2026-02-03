type Props = {
    show: boolean;
    onClick: () => void;
};

export default function AllProjectsButton({ show, onClick }: Props) {
    if (!show) return null;

    return (
        <button className="all-projects-btn" onClick={onClick}>
            Alle Projekte →
        </button>
    );
}
