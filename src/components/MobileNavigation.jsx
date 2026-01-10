import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Home, Layers, Code, User } from 'lucide-react';

const MobileNavigation = () => {
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
      const scrollPosition = window.scrollY + 100;

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

      if (scrollPosition < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    setActiveSection(id);
    
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
    hidden: { y: 100, opacity: 0 },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-slate-800 z-50 lg:hidden pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center px-6 py-3">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-1/4"
            >
              <Button
                variant="ghost"
                className={`flex flex-col items-center gap-1 w-full h-auto py-2 ${
                  isActive ? 'text-primary bg-primary/10 hover:bg-primary/20 hover:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.id);
                }}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </motion.div>
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
                <span className="text-[10px] font-medium whitespace-pre-line text-center leading-tight">
                  {item.label}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;