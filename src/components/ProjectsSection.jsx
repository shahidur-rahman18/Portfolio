import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Github, BarChart3, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const projects = [
    {
      title: 'Style Decor',
      description: 'Styl Decor is a premium, full-stack appointment management platform designed for decoration businesses. It streamlines the process of booking in-studio consultations and on-site decoration services, managing professional decorators, and tracking project progress in real-time.',
      icon: BarChart3,
      image: 'https://i.ibb.co.com/h18m2nHt/Screenshot-2026-01-05-182318.png',
      tags: ['Full Stack Project'],
      featured: true,
      liveDemo: 'https://style-decor-client-self.vercel.app/',
      github: 'https://github.com/shahidur-rahman18/Style-Decor.git'
    },
    {
      title: 'Book Haven',
      description: 'A full-stack digital library platform where users can explore, add, update, and manage books with secure authentication. Built using React, Node.js, Express.js, MongoDB, and Firebase Authentication.',
      icon: ShoppingBag,
      image: 'https://i.ibb.co.com/K3vxcv4/Screenshot-2026-01-05-184145.png',
      tags: ['React', 'Tailwind', 'Framer Motion'],
      featured: false,
      liveDemo: 'https://the-book-haven-book.netlify.app/',
      github: 'https://github.com/shahidur-rahman18/The-Book-Haven-.git'
    },
    {
      title: 'Ecommerce-Plants',
      description:'A modern full-stack web application built with a clean architecture, secure authentication, and responsive UI.Describe your project briefly here in 2–3 lines.',
      icon: MessageSquare,
      image: 'https://i.ibb.co.com/HfJhvySH/Screenshot-2026-01-05-184252.png',
      tags: ['React', 'Node.js', 'MongoDB'],
      featured: false,
      liveDemo: 'https://plants-client-two.vercel.app/',
      github: 'https://github.com/shahidur-rahman18/Ecommerce-Plants.git'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(".projects-header", 
        { 
          opacity: 0, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate project cards with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 60,
              scale: 0.9,
              rotateY: 15
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateY: 0,
              duration: 0.8,
              delay: index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Animate project header gradient on scroll
          const header = card.querySelector('.project-header');
          if (header) {
            gsap.fromTo(header,
              { 
                scale: 1.1,
                opacity: 0.8
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.2 + 0.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }

          // Animate tags with stagger
          const tags = card.querySelectorAll('.project-tag');
          tags.forEach((tag, tagIndex) => {
            gsap.fromTo(tag,
              { 
                opacity: 0,
                scale: 0.8,
                y: 10
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.4,
                delay: index * 0.2 + tagIndex * 0.1 + 0.4,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={sectionRef} className="w-full max-w-6xl mx-auto mb-10" id="projects">
      <motion.div 
        className="projects-header flex items-end justify-between mb-8 px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-foreground">Recent Projects</h2>
        </div>
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="link" className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-sky-400">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project, index) => {
          const IconComponent = project.icon;
          return (
            <motion.div
              key={index}
              ref={el => cardsRef.current[index] = el}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col bg-white dark:bg-[#2c3342] border border-gray-200 dark:border-slate-600">
                {/* Project Header with Image */}
                <div className="project-header h-48 w-full relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  {/* Project Image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Shadow Overlay instead of gradient */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  
                  {/* Decorative Elements */}
                  <motion.div 
                    className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {project.featured && (
                    <motion.div 
                      className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      Featured
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="absolute bottom-4 left-4 p-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/20"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <IconComponent className="text-white h-6 w-6" />
                  </motion.div>
                </div>

                {/* Project Content */}
                <CardContent className="p-5 flex flex-col flex-grow">
                  <div className="mb-3">
                    <motion.h3 
                      className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-slate-600 dark:text-slate-300 text-sm mt-2 line-clamp-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tagIndex}
                        className="project-tag"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge 
                          variant="outline"
                          className="text-[10px] font-semibold uppercase tracking-wide bg-primary/10 text-primary border-primary/20"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                {/* Project Footer */}
                <CardFooter className="p-5 pt-0">
                  <motion.div 
                    className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-slate-600 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all" asChild>
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="outline" className="w-full active:scale-95 transition-all" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div 
        className="mt-8 text-center sm:hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="link" className="text-primary hover:text-sky-400 px-4 py-2 rounded-lg hover:bg-primary/5">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;