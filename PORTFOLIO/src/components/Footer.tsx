import React from 'react';

interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { icon: '🐙', label: 'GitHub', href: '#' },
    { icon: '💼', label: 'LinkedIn', href: '#' },
    { icon: '📧', label: 'Email', href: '#' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Portfolio. All rights reserved.</p>
        <div className="social-links">
          {socialLinks.map((link: SocialLink, index: number) => (
            <a 
              key={index}
              href={link.href} 
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;