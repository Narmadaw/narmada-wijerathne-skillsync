import {Link} from 'react-router-dom';
import Banner from './../../assets/images/hero.png';
import './Hero.scss';

const Hero = () =>{
    return(
        <>
        <div className="wrapper">
            <div className="wrapper__left-pannel">
            <img className='wrapper__hero' src={Banner} alt="banner" />
            </div>
            <div className="wrapper__right-pannel">
                <h1>Use the best resume maker as your guide</h1>
                <p> Getting that dream job can seem like an impossible task. 
                    We’re here to change that. Give yourself a real advantage with 
                    the best online resume maker: created by experts, 
                    improved by data, trusted by millions of professionals.
                </p>
              <Link to={'/profile'}>
                <button className='wrapper__hero-btn'>Start Your Resume</button>
              </Link>
            </div>
        </div>
        
        </>
    );
    

}

export default Hero;