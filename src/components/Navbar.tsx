import "../css/Navbar.css"

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <div className="logo">
                    <span className="logo-bold">stadtgemeinde</span>
                    <span className="logo-name">leibnitz</span>
                </div>

                <nav>
                    <a href="#">STARTSEITE</a>
                    <a href="#">AMTSTAFEL</a>
                    <a href="#">RATHAUS ▾</a>
                    <a href="#" className="active">PROJEKTE</a>
                </nav>
            </div>
        </header>
    );
}
