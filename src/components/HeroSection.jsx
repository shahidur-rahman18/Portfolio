import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const texts = [
      'Md.Shahidur Rahman Passionate Web Developer',
      'Md.Shahidur Rahman Passionate Frontend Developer', 
      'Md.Shahidur Rahman Passionate React Developer',
      'Md.Shahidur Rahman Passionate Full Stack Developer'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let intervalId;

    const typeText = () => {
      const currentText = texts[currentTextIndex];
      
      if (!isDeleting) {
        // Typing
        setDisplayText(currentText.slice(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
          // Finished typing, wait then start deleting
          setTimeout(() => {
            isDeleting = true;
          }, 1000);
        }
      } else {
        // Deleting
        setDisplayText(currentText.slice(0, currentCharIndex - 1));
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          // Finished deleting, move to next text
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % texts.length;
        }
      }
    };

    // Start typing animation - professional speed
    intervalId = setInterval(typeText, isDeleting ? 50 : 100);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(intervalId);
      clearInterval(cursorInterval);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl mx-auto w-full mb-8 scroll-mt-24" 
      id="about"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Image */}
      <motion.div 
        className="relative w-full max-w-sm aspect-square flex items-center justify-center"
        variants={imageVariants}
      >
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full transform scale-90"></div>
        <motion.div 
          className="relative w-72 h-72 sm:w-80 sm:h-80 blob-shape bg-gradient-to-br from-primary to-blue-600 overflow-hidden shadow-2xl border-4 border-background z-10 flex items-end justify-center"
          whileHover={{ 
            scale: 1.05,
            rotate: 2,
            transition: { duration: 0.3 }
          }}
        >
          <img 
            alt="Portrait of Chandni Chauhan" 
            className="w-full h-full object-cover object-top mix-blend-normal" 
            src="https://i.ibb.co.com/V0RxnQcW/i.jpg"
          />
        </motion.div>
        <div className="absolute w-[110%] h-[110%] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border border-primary/30 animate-pulse"></div>
      </motion.div>

      {/* Content */}
      <div className="flex flex-col text-center lg:text-left space-y-5 w-full">
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-2 leading-tight min-h-[3.5rem] sm:min-h-[4rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {displayText.split(' ').slice(0, 2).join(' ')}
            {showCursor && displayText.split(' ').length <= 2 && (
              <span className="text-primary animate-pulse">|</span>
            )}
          </motion.h1>
          <motion.h2 
            className="text-xl sm:text-2xl font-semibold text-black dark:text-white min-h-[2rem] sm:min-h-[2.5rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {displayText.split(' ').length > 2 && (
              <>
                <span className="text-black dark:text-white">
                  {displayText.split(' ').slice(2, 3).join(' ')}{' '}
                </span>
                <span className="text-primary font-bold">
                  {displayText.split(' ').slice(3).join(' ')}
                </span>
              </>
            )}
            {showCursor && displayText.split(' ').length > 2 && (
              <span className="text-primary animate-pulse">|</span>
            )}
          </motion.h2>
        </motion.div>

        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-xm sm:text-base lg:text-sm leading-relaxed max-w-lg mx-auto lg:mx-0"
          variants={itemVariants}
        >
         My journey began with a curiosity about building dynamic web applications, which grew into a career focused on full-stack development. I specialize in the MERN stack (MongoDB, Express.js, React, and Node.js) and building scalable, high-performance applications. With a strong passion for clean code, modern UI design, and problem-solving, I transform complex requirements into efficient and user-friendly digital solutions.
        </motion.p>

        {/* Skills Tags */}
        <motion.div 
          className="flex flex-wrap justify-center lg:justify-start gap-2 max-w-lg mx-auto lg:mx-0"
          variants={badgeVariants}
        >
          {['React','Next.js', 'Node.js', 'UI/UX Design', 'Cloud Architecture'].map((skill, index) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge variant="secondary" className='text-white'  >{skill}</Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center lg:justify-start gap-4 py-2"
          variants={socialVariants}
        >
          {[
            { icon: Github, href: "https://github.com/shahidur-rahman18" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/shahidur-rahman18/" },
            { icon: Twitter, href: "https://x.com/ShahidurRa94403" },
            { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=mdshahidurrahman3690@gmail.com&su=Hello%20Md.Shaidur%20Rahman&body=Hi%20there,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.%0A%0ABest%20regards" }
          ].map((social, socialIndex) => {
            const IconComponent = social.icon;
            return (
              <motion.div
                key={socialIndex}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="icon" className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white border-gray-300 dark:border-gray-600" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <IconComponent className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 w-full sm:w-auto"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-1 active:scale-95 text-white"
              onClick={() => {
                const footer = document.querySelector('footer');
                if (footer) {
                  footer.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              <Send className="mr-2 h-4 w-4 " />
              Let's Connect
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;