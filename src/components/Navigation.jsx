import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Download, Home, Layers, Code, User } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { icon: Home, label: 'Home', href: '#about', id: 'home' },
    { icon: Layers, label: 'Projects', href: '#projects', id: 'projects' },
    { icon: Code, label: 'Skills', href: '#skills', id: 'skills' },
    { icon: User, label: 'About', href: '#education', id: 'education' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'education', 'projects'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          if (sections[i] === 'about') {
            setActiveSection('home');
          } else {
            setActiveSection(sections[i]);
          }
          break;
        }
      }

      // If at the very top, set home as active
      if (scrollPosition < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    setActiveSection(id);
    
    // Smooth scroll to section
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full  bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Professional Portfolio Logo */}
        <motion.div 
          className="flex items-center"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-xl md:text-4xl font-bold tracking-tight signature-text" style={{ fontFamily: 'Dancing Script, Brush Script MT, cursive' }}>
            <span className="text-white">Shahidur</span>
            <span className="text-primary">Rahman</span>
          </div>
        </motion.div>

        {/* Desktop Navigation Menu - Hidden on mobile */}
        <motion.div 
          className="hidden lg:flex items-center gap-8"
          variants={itemVariants}
        >
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive 
                      ? 'text-primary bg-primary/10 hover:bg-primary/20 hover:text-white' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.id);
                  }}
                >
                  <div className="relative">
                    <IconComponent className="h-4 w-4" />
                    {isActive && (
                      <motion.span 
                        className="absolute -top-1 -right-1 flex h-2 w-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </motion.span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right side buttons */}
        <motion.div 
          className="flex items-center gap-3"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button className="bg-green-500  hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all active:scale-95" asChild>
              <a href="https://drive.google.com/file/d/15TkA-LCP7EQD8fsNK9zOn5OnlfNWaPjv/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <span>Resume</span>
                <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;