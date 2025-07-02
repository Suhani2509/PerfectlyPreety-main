import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer className="footer" style={{marginTop:"60px"}}>
    <div className="container">
        <div className="row align-items-center">
            <div className="col-md-6">
                <div className="footer-brand">Perfectly Preety</div>
                <p className="footer-text">"Redefining beauty standards worldwide,
through cutting-edge solutions and personalized experiences
for every customer."</p>
                <div className="social-links">
                    <Link to="https://x.com/prettycosmetics" className="social-link"><TwitterIcon></TwitterIcon></Link>
                    <Link to="https://www.facebook.com/perfectlyprettycosmetics/" className="social-link"><FacebookRoundedIcon></FacebookRoundedIcon></Link>
                    <Link to="https://www.instagram.com/pretty_perfect_beauty/" className="social-link"><InstagramIcon></InstagramIcon></Link>
                    <Link to="https://www.linkedin.com/company/prettycosmetics" className="social-link"><LinkedInIcon></LinkedInIcon></Link>
                </div>
            </div>

            <div className="col-md-6 text-md-end">
                <ul className="footer-links">
                    <li><Link className="link" to="/about">About</Link></li>
                    <li><Link className="link" to="/blush">Products</Link></li>
                    <li><Link className="link" to="/contact">Contact</Link></li>
                    <li><Link className="link" to="/home">Home</Link></li>
                    <li><Link className="link" to="">Terms</Link></li>
                    <li><Link className="link" to="">Services</Link></li>
                </ul>
                
            </div>
        </div>

        <div className="copyright text-center">
            © 2024 Perfectly Preety Cosmetics. All rights reserved.
        </div>
    </div>
</footer>
  );
};

export default Footer;
