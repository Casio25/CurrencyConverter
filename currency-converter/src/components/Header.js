import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

export function Header() {
    return (
        <nav className="header-nav" style={{ display: "flex", flexDirection: "row" }}>
            <div className="HeaderLogo" >
                <img src={Logo} alt="Logo" className="logo" />
                <span className="logo-text">StereoBank</span>
            </div>
            <div className="header-nav-list" style={{display:"flex", flexDirection:"row"}}>
                <div className="header-nav-item">
                    <Link to="/home">Послуги</Link>
                </div>
                <div className="header-nav-item">
                    <Link to="/converter">Конвертер валют</Link>
                </div>
                <div className="header-nav-item">
                    <Link to="/empty">Контакти</Link>
                </div>
            </div>
        </nav>
    );
}
