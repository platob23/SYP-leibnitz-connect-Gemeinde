import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <div className="logo">
                    <span className="logo-light">stadtgemeinde</span>
                    <span className="logo-bold">leibnitz</span>
                </div>

                <nav>
                    <a href="/start" onClick={(e) => {e.preventDefault; navigate("/start")}}>STARTSEITE</a>
                    <a href="/amtstafel" onClick={(e) => {e.preventDefault; navigate("/amtstafel")}}>AMTSTAFEL</a>
                    <a href="/rathaus" onClick={(e) => {e.preventDefault; navigate("/rathaus")}}>RATHAUS ▾</a>
                    <a href="/projekte" onClick={(e) => {e.preventDefault; navigate("/projekte")}} className="active">PROJEKTE</a>
                </nav>
            </div>
        </header>
    );
}
