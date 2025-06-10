import React from 'react';

interface HeaderProps {
  scrollY: number;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollY, isMobileMenuOpen, toggleMobileMenu, scrollToSection }) => {
  return (
    <header className="header" style={{
      background: scrollY > 100 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
      boxShadow: scrollY > 100 ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none'
    }}>
      <div className="container">
        <nav className="nav-container">
          <a 
            className="logo" 
            onClick={() => scrollToSection('home')}
          >
            Portfolio
          </a>
          <ul className="nav-menu" style={{
            left: isMobileMenuOpen ? '0' : '-100%'
          }}>
            <li><a onClick={() => scrollToSection('home')}>홈</a></li>
            <li><a onClick={() => scrollToSection('about')}>소개</a></li>
            <li><a onClick={() => scrollToSection('portfolio')}>포트폴리오</a></li>
            <li><a onClick={() => scrollToSection('contact')}>연락처</a></li>
          </ul>
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;