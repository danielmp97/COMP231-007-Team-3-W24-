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
                        <li><a href="#learn">Learn</a></li>
                        <li><a href="#integrations">Integrations</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="tel:+14376730636">+14376730636</a></li>
                        <li>
                            {/* Link to login page */}
                            <Link to="/login" className="login-btn">Login</Link>
                        </li>
                        <li><button className="start-free-btn">Start FREE</button></li>
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
                    <img src={appointment} alt="appointment" className="appointment" />
                </div>
                {/* Hero Image */}
                <div className="picture-table">
                    <table>
                        <tbody>
                            <tr>
                                <td className="picture-cell">
                                    <img src={heroimage} alt="heroimage" className="heroimage" />
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
                    <h2>Spotlight your brand.</h2>
                    <p>Brand experience hits a whole new level with a custom Booking Page. Show why your business stands apart and enable people to self-book at their convenience.</p>
                </div>
                {/* Feature 3 */}
                <div className="feature">
                    <h2>Stay one step ahead</h2>
                    <p>Share your online Booking Page and every new appointment lands in your calendar.</p>
                </div>
                {/* Add more features as needed */}
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
                {/* Testimonial 1 */}
                <div className="testimonial">
                    <p>“I can be literally Anywhere and schedule people.” - Aaron Goulding, South Coast Pet Dental</p>
                </div>
                {/* Testimonial 2 */}
                <div className="testimonial">
                    <p>“MedLink is a hidden gem. We are so, so happy we found it.” - Laura Gomez, TDC Digital Agency</p>
                </div>
                {/* Add more testimonials as needed */}
            </div>

            {/* Pricing Section */}
            <div className="pricing-section">
                {/* Pricing Plans */}
                <div className="pricing-plans">
                    <div className="plan">
                        <h2>Free</h2>
                        <p>Up to 4 users</p>
                        <p>$0 user / month</p>
                        <button className="start-free-btn">Start FREE</button>
                    </div>
                    {/* Add more pricing plans as needed */}
                </div>
                {/* FAQs */}
                <div className="faqs">
                    <h2>FAQs</h2>
                    <ul>
                        <li>What’s an online Booking Page?</li>
                        <li>What’s the difference between my MedLink calendar and Booking Page?</li>
                        {/* Add more FAQs as needed */}
                    </ul>
                </div>
            </div>

            {/* Footer Section */}
            <div className="footer-section">
                <p>&copy; MedLink Appointments</p>
                <div className="social-media-links">
                    <a href="#"><img src="facebook-logo.png" alt="Facebook Logo" /></a>
                    <a href="#"><img src="instagram-logo.png" alt="Instagram Logo" /></a>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
