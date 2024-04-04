import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import heroimage from '../assets/heroimage.jpg';
import logo from '../assets/logo.png';
import appointment from '../assets/appointment.gif';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
           
            <div id='navbar' className="header-section">
                {/* Navigation Menu */}
                <nav className="navigation-menu">
                    <ul>
                        <li><div id='logo'><img src={logo} alt="logo" className="logo" /></div></li>
                        <li><a href="#learn"><b>Learn</b></a></li>
                        <li><a href="#integrations"><b>Integrations</b></a></li>
                        <li><a href="#features"><b>Features</b></a></li>
                        <li><a href="#pricing"><b>Pricing</b></a></li>
                        <li><a href="#contact"><b>Contact</b></a></li>
                        <li><a href="tel:+14376730636">+14376730636</a></li>
                        <li>
                            {/* Link to login page */}
                            <Link to="/login" className="login-btn"><b>Login</b></Link>
                        </li>
                        <li><button className="start-free-btn"><b>Start FREE</b></button></li>
                    </ul>
                </nav>
            </div>
            
            

        
            <div className="hero-section">
                {/* Hero Content */}
                <div id='prompttext' className="hero-content">
                    <h1>Introducing one click Appointments at yourfingertips!!! .</h1>
                    <br />
                    <br />
                    <br /><br /><br /><br /><br />
                    <img src={heroimage} alt="heroimage" className="heroimage" />
                   
                </div>
                {/* Hero Image */}
                <div className="picture-table">
                    <table>
                        <tbody>
                            <tr>
                                <td className="picture-cell">
                                <img src={appointment} alt="appointment" className="appointment" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                {/* Feature 1 */}
                <div className="feature">
                    <h2>Free scheduling software.</h2>
                    <p>Organize your business with 24/7 automated online booking, reminders, payments, and more.</p>
                </div>
                {/* Feature 2 */}
                <div className="feature">
                    
                </div>
                
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
                {/* Testimonial 1 */}
                <div className="testimonial">
                    <p><h4>“I can be literally Anywhere and schedule people.” - Mr Bean, MI 6</h4></p>
                </div>
                {/* Testimonial 2 */}
                
            </div>
            <hr />

            {/* Pricing Section */}
            <div className="pricing-section">
                {/* Pricing Plans */}
                <div className="pricing-plans">
                    <div className="plan">
                        <h2>Free</h2>
                        <p><h3>Up to 3 users!!</h3></p>
                        <p><h2>$0 /user</h2> </p>
                        <button className="start-free-btn"><h1>Start FREE</h1></button>
                    </div>
                    {/* Add more pricing plans as needed */}
                </div>
                {/* FAQs */}
                <div className="faqs">
                    
                </div>
            </div>
            <hr />

            {/* Footer Section */}
            <div id='finalsocial' className="footer-section">
                <p>&copy; MedLink Appointments     all rights reserved</p>
                <div className="social-media-links">
                    <a href="#"><img src="facebook-logo.png" alt="Facebook Logo" /></a>
                    <a href="#"><img src="instagram-logo.png" alt="Instagram Logo" /></a>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
