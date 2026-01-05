import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Download, Home, Layers, Code, User } from 'lucide-react';

const Navigation = ({ isDark, toggleTheme }) => {
  const navItems = [
    { icon: Home, label: 'Home', href: '#', isActive: true },
    { icon: Layers, label: 'Projects', href: '#projects' },
    { icon: Code, label: 'Skills', href: '#skills' },
    { icon: User, label: 'About', href: '#about' },
  ];

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
        {/* Logo */}
        <motion.div 
          className="text-2xl font-bold tracking-tight"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-slate-900 dark:text-white">Port</span>
          <span className="text-primary">folio</span>
        </motion.div>

        {/* Desktop Navigation Menu - Hidden on mobile */}
        <motion.div 
          className="hidden lg:flex items-center gap-8"
          variants={itemVariants}
        >
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
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
                    item.isActive 
                      ? 'text-primary bg-primary/10 hover:bg-primary/20' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5'
                  }`}
                  asChild
                >
                  <a href={item.href}>
                    <div className="relative">
                      <IconComponent className="h-4 w-4" />
                      {item.isActive && (
                        <motion.span 
                          className="absolute -top-1 -right-1 flex h-2 w-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </motion.span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
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
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all active:scale-95" asChild>
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