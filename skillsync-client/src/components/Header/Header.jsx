import {Link} from 'react-router-dom';
import Logo from './../../assets/images/logo/logo.png';
import './Header.scss';


const Header = ()=>{
    return(
        <>
        <div className="header">
            <div className="header__nav">
                <div className="header__logo">
                    <Link to='/'>
                        <img className='header__logo-img' src={Logo} alt="logo" />
                    </Link>
                    
                </div>
                <div className="headr__container">
                    <ul className='header__nav-list'>
                        <Link className='header__link' to='/'>
                            <li className='header__nav-item'>Homepage</li>
                        </Link>
                        <li className='header__nav-item header__nav-item--sign-in'>Sign In</li>
                        <li className='header__nav-item header__nav-item--sign-up'>Sign Up</li>
                    </ul>
                </div>
            </div>
        </div>     
        </>
    );
}
export default Header;