import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, School } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardsRef = useRef([]);

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science Engineering',
      institution: 'European University Of Bangladesh',
      period: '2023 - 2026',
      description: 'Core curriculum focused on Data Structures, Database Management, and Web Technologies.',
      badges: [
        { text: '3.9 GPA', icon: 'fas fa-star' },
        { text: 'Algorithms', icon: 'fas fa-book' },
        { text: 'Coding Club Lead', icon: 'fas fa-users' }
      ],
      icon: GraduationCap,
      color: 'blue',
      isActive: true
    },
   
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(".education-header", 
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

      // Animate timeline line
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current,
          { 
            scaleY: 0,
            transformOrigin: "top"
          },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animate education cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              x: index % 2 === 0 ? -50 : 50,
              y: 30
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
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

          // Animate timeline dots
          const dot = card.querySelector('.timeline-dot');
          if (dot) {
            gsap.fromTo(dot,
              { 
                scale: 0,
                opacity: 0
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                delay: index * 0.2 + 0.3,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section ref={sectionRef} className="w-full max-w-6xl mx-auto mb-16" id="education">
      <motion.div 
        className="education-header flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 px-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h3 className="text-sm font-bold text-primary tracking-wider uppercase mb-1">Academic Path</h3>
          <h2 className="text-3xl font-bold text-foreground">Educational Qualification</h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-md text-left sm:text-right">
          Building a strong theoretical foundation for practical application.
        </p>
      </motion.div>

      <div className="relative">
        <div 
          ref={timelineRef}
          className="absolute left-4 top-4 bottom-4 w-0.5 bg-border rounded-full hidden sm:block"
        ></div>
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {education.map((edu, index) => {
            const IconComponent = edu.icon;
            return (
              <motion.div 
                key={index} 
                ref={el => cardsRef.current[index] = el}
                className="relative sm:pl-12"
                variants={cardVariants}
              >
                <div className={`timeline-dot absolute left-[9px] top-8 w-4 h-4 rounded-full border-4 border-background hidden sm:block z-10 ${
                  edu.isActive ? 'bg-primary' : 'bg-muted-foreground'
                }`}></div>
                <motion.div
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="hover:shadow-primary/5 transition-all duration-300 bg-white dark:bg-[#2c3342] border border-gray-200 dark:border-slate-600">
                    <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <motion.div 
                          className={`w-14 h-14 rounded-xl flex items-center justify-center border ${
                            edu.color === 'blue' 
                              ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
                              : 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20'
                          }`}
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <IconComponent className="h-6 w-6" />
                        </motion.div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                            <p className="text-primary font-medium text-sm">{edu.institution}</p>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                          >
                            <Badge variant="secondary" className="mt-2 sm:mt-0 w-fit">
                              {edu.period}
                            </Badge>
                          </motion.div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                          {edu.description}
                        </p>
                        <motion.div 
                          className="flex flex-wrap gap-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, staggerChildren: 0.1 }}
                        >
                          {edu.badges.map((badge, badgeIndex) => (
                            <motion.div
                              key={badgeIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: badgeIndex * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge 
                                variant="outline" 
                                className={`text-[10px] ${
                                  edu.color === 'blue'
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800'
                                    : 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 border-purple-100 dark:border-purple-800'
                                }`}
                              >
                                <i className={`${badge.icon} text-[8px] mr-1`}></i>
                                {badge.text}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;