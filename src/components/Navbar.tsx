import { useState, useEffect } from 'react';
import './Navbar.css';
import { translations } from '../translations';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const userLang = typeof window !== 'undefined' ? (navigator.language.startsWith('pt') ? 'pt' : 'en') : 'en';
    const t = translations[userLang as keyof typeof translations];

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false); // Close menu on click
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo" onClick={() => scrollToSection('home')}>
                    Felipe<span className="highlight">.dev</span>
                </div>

                <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu} aria-label="Toggle Navigation">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <button onClick={() => scrollToSection('home')} className="nav-link">{t.nav.home}</button>
                    <button onClick={() => scrollToSection('about')} className="nav-link">{t.nav.about}</button>
                    <button onClick={() => scrollToSection('skills')} className="nav-link">{t.nav.skills}</button>
                    <button onClick={() => scrollToSection('projects')} className="nav-link">{t.nav.projects}</button>
                    <button onClick={() => scrollToSection('contact')} className="nav-link highlight-btn">{t.nav.contact}</button>
                </div>
            </div>
            {/* Overlay to catch clicks outside on mobile */}
            {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
        </nav>
    );
};

export default Navbar;
