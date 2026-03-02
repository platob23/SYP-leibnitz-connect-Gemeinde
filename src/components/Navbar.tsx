import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

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
                    <a href="/start" onClick={() => {navigate("/start")}}>STARTSEITE</a>
                    <a href="/amtstafel" onClick={() => {navigate("/amtstafel")}}>AMTSTAFEL</a>
                    <a href="/rathaus" onClick={() => {navigate("/rathaus")}}>RATHAUS ▾</a>
                    <a href="/projekte" onClick={() => {navigate("/projekte")}} className="active">PROJEKTE</a>
                </nav>
            </div>
        </header>
    );
}
