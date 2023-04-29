import "../styles/Footer.css";
import logo from "../images/logo.png";
import phone from "../images/phone.svg";
import oldPhone from "../images/Vector.svg";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png"
import twitter from "../images/twitter.png";
import youtube from "../images/youtube.png";
export const FooterMain = () => {
    return (
        <div>
            <div className='footer'>
                <div className='logo'>
                    <img className='logo_img' src={logo}  alt='logo' />
                    <h3 className='item_bank'>Банк</h3>
                </div>
                <h5 className='adress'>04128, м.Київ, вул. Хрещатик, 19 <br></br>
                    Ліцензія НБУ №156 <br></br>
                    Ⓒ Банк, 2019-2023
                </h5>
                <ul className='footer_items'>
                    <li>Послуги</li>
                    <li>Конвертор валют</li>
                    <li>Контакти</li>
                    <li>Задати питання</li>
                </ul>
                <div className='contacts'>
                    <img className='phone'  src ={phone} alt='phone' ></img>
                    <h5 className='phone_number'>+380</h5>
                    <p className='call_us'>Цілодобова підтримка</p>
                </div>

                <div className='mobile'>
                    <img className='mobile_img' src={oldPhone} alt='mobile' />
                    <h5 className='mobile_number'>8 800 555 35 35</h5>
                    <p className='free_call'>Безкоштовно для дзвінків в межах України</p>
                </div>
            </div>

            <div className='social_media'>
                <img className='social_media_img' src={facebook} alt='facebook' />
                <img className='social_media_img' src={instagram} alt='instagram' />
                <img className='social_media_img' src={twitter} alt='twitter' />
                <img className='social_media_img' src={youtube} alt='youtube' />
            </div>
        </div>
    );
};
