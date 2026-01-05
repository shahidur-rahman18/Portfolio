import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const skillCategories = useMemo(() => [
    {
      title: 'Languages',
      subtitle: 'Core technologies',
      icon: 'fas fa-code',
      color: 'orange',
      skills: [
        { name: 'JavaScript', level: 95, icon: 'fab fa-js text-yellow-500' },
        { name: 'TypeScript', level: 90, icon: 'fas fa-code text-blue-500' },
        { name: 'HTML5 & CSS3', level: 98, icon: 'fab fa-html5 text-orange-600' },
      ]
    },
    {
      title: 'Frontend',
      subtitle: 'Modern libraries',
      icon: 'fas fa-layer-group',
      color: 'sky',
      skills: [
        { name: 'React', level: 95, icon: 'fab fa-react text-sky-400' },
        { name: 'Next.js', level: 90, icon: 'fas fa-layer-group text-slate-800 dark:text-white' },
        { name: 'Tailwind CSS', level: 95, icon: 'fas fa-wind text-cyan-500' },
      ]
    },
    {
      title: 'Backend',
      subtitle: 'Server & Services',
      icon: 'fas fa-server',
      color: 'purple',
      skills: [
        { name: 'Node.js', level: 90, icon: 'fab fa-node text-green-500' },
        { name: 'Express.js', level: 85, icon: 'fas fa-hashtag text-slate-400 dark:text-slate-300' },
        { name: 'Firebase', level: 80, icon: 'fas fa-fire text-amber-500' },
      ]
    },
    {
      title: 'Data & Tools',
      subtitle: 'DBs & DevOps',
      icon: 'fas fa-database',
      color: 'emerald',
      skills: [
        { name: 'MongoDB', level: 85, icon: 'fab fa-envira text-green-500' },
        { name: 'PostgreSQL', level: 80, icon: 'fas fa-database text-blue-500' },
        { name: 'Git & GitHub', level: 92, icon: 'fab fa-github text-slate-700 dark:text-slate-300' },
      ]
    },
  ], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(".skills-header", 
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

      // Animate cards with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 50,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Animate progress bars within each card
          const progressBars = card.querySelectorAll('.progress-bar');
          progressBars.forEach((progressBar, skillIndex) => {
            const skillLevel = skillCategories[index].skills[skillIndex].level;
            
            gsap.fromTo(progressBar,
              { 
                width: "0%" 
              },
              {
                width: `${skillLevel}%`,
                duration: 1.2,
                delay: index * 0.15 + skillIndex * 0.1 + 0.3,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 75%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [skillCategories]);

  const getColorClasses = (color) => {
    const colors = {
      orange: 'bg-orange-100 dark:bg-orange-500/10 text-orange-500 border-orange-200 dark:border-orange-500/20',
      sky: 'bg-sky-100 dark:bg-sky-500/10 text-sky-500 border-sky-200 dark:border-sky-500/20',
      purple: 'bg-purple-100 dark:bg-purple-500/10 text-purple-500 border-purple-200 dark:border-purple-500/20',
      emerald: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 border-emerald-200 dark:border-emerald-500/20',
    };
    return colors[color] || colors.sky;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section ref={sectionRef} className="w-full max-w-6xl mx-auto mb-16" id="skills">
      <motion.div 
        className="skills-header flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 px-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h3 className="text-sm font-bold text-primary tracking-wider uppercase mb-1">My Arsenal</h3>
          <h2 className="text-3xl font-bold text-foreground">Technical Skills</h2>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div 
            key={categoryIndex} 
            ref={el => cardsRef.current[categoryIndex] = el}
            className="bg-white dark:bg-[#2c3342] rounded-2xl p-6 hover:shadow-primary/5 transition-all duration-300 border border-gray-200 dark:border-slate-600"
            variants={cardVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getColorClasses(category.color)}`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <i className={`${category.icon} text-xl`}></i>
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{category.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-300">{category.subtitle}</p>
              </div>
            </div>
            <div className="space-y-6">
              {category.skills.map((skill, skillIndex) => (
                <motion.div 
                  key={skillIndex} 
                  className="group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: skillIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center shadow-sm"
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <i className={`${skill.icon} text-xl`}></i>
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="progress-bar h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;