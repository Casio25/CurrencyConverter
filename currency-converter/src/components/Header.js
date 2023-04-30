import { Link, Outlet } from "react-router-dom";
import Logo from "../images/logo.png";
import Vector from "../images/Vector.png";
import "../styles/Header.css";

export function Header() {
    return (
        <div className='top_menu'>
            <div className='top_menu_content'>
                <img className='logo' src={Logo} alt='logo' />
                <h3>Банк</h3>
                <nav className='menu_items'>
                    <li id='services_item'>
                        <Link to={"./empty"} className="regular-link">Послуги</Link></li>
                    <li id='convertor_item'>
                        <Link to={'/converter'} className="regular-link">
                            Конвертер валют
                        </Link>
                    </li>
                    <li id='contacts_item'>Контакти</li>
                    <li id='question_item'>Задати питання</li>
                </nav>
                <Outlet />
                <img className='special_office' src={Vector} alt='special office' />
                <h3 className='special_office_title'>Особистий кабінет</h3>
            </div>
        </div>
    );
}

