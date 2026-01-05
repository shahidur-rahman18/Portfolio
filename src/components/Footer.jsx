import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/shahidur-rahman18", 
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/shahidur-rahman18/", 
      label: "LinkedIn",
      color: "hover:text-blue-600"
    },
    { 
      icon: Twitter, 
      href: "https://x.com/ShahidurRa94403", 
      label: "Twitter",
      color: "hover:text-sky-500"
    },
    { 
      icon: Mail, 
      href: "mailto:mdshahidurrahman3690@gmail.com", 
      label: "Email",
      color: "hover:text-red-500"
    }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.footer 
      className="w-full bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-slate-800 mt-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="mb-4">
              <h3 className="text-2xl font-bold tracking-tight">
                <span className="text-slate-900 dark:text-white">Md.Shahidur</span>
                <span className="text-primary"> Rahman</span>
              </h3>
              <p className="text-primary font-medium text-sm mt-1">Full Stack Web Developer</p>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              Passionate about creating innovative web solutions that bridge the gap between design and functionality. 
              Let's build something amazing together.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="h-4 w-4 text-primary" />
                <span>+880 1724269209</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4 text-primary" />
                <span>mdshahidurrahman3690@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 ${social.color} transition-all duration-200`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <IconComponent className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-slate-600 dark:text-slate-400 text-sm">Web Development</span>
              </li>
              <li>
                <span className="text-slate-600 dark:text-slate-400 text-sm">Frontend Development</span>
              </li>
              <li>
                <span className="text-slate-600 dark:text-slate-400 text-sm">Backend Development</span>
              </li>
              <li>
                <span className="text-slate-600 dark:text-slate-400 text-sm">UI/UX Design</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        className="border-t border-gray-200 dark:border-slate-800 py-6 px-6"
        variants={itemVariants}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>© {currentYear} Md.Shahidur Rahman. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>in Bangladesh</span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <motion.a 
              href="#privacy"
              className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
              whileHover={{ y: -1 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#terms"
              className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
              whileHover={{ y: -1 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;