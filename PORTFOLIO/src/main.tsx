import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { debounce, scrollToSection } from './utils/helpers';
import './styles/Portfolio.css';

const Portfolio: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const debouncedHandleScroll = debounce(handleScroll, 10);
    
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  // 리사이즈 이벤트 처리
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    const debouncedHandleResize = debounce(handleResize, 250);
    
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScrollToSection = (sectionId: string): void => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="portfolio">
      <Header 
        scrollY={scrollY}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        scrollToSection={handleScrollToSection}
      />
      
      <HeroSection scrollToSection={handleScrollToSection} />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Portfolio;