import Logo from './../../assets/images/logo/logo.png';
import './Header.scss';


const Header = ()=>{
    return(
        <>
        <div className="header">
            <div className="header__nav">
                <div className="header__logo">
                    <img className='header__logo-img' src={Logo} alt="logo" />
                </div>
                <div className="headr__container">
                    <ul className='header__nav-list'>
                        <li className='header__nav-item'>Homepage</li>
                        <li className='header__nav-item'><button className='header__nav-cancel-btn'>Sign In</button></li>
                        <li className='header__nav-item'><button className='header__nav-primary-btn'>Sign Up</button></li>
                    </ul>
                </div>
            </div>
        </div>     
        </>
    );
}
export default Header;