import { useEffect, useRef, useMemo } from 'react';
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
        { name: 'JavaScript', icon: 'fab fa-js text-yellow-500' },
        { name: 'TypeScript', icon: 'fas fa-code text-blue-500' },
        { name: 'HTML5', icon: 'fab fa-html5 text-orange-600' },
        { name: 'CSS3', icon: 'fab fa-css3-alt text-blue-600' },
      ]
    },
    {
      title: 'Frontend',
      subtitle: 'Modern libraries',
      icon: 'fas fa-layer-group',
      color: 'sky',
      skills: [
        { name: 'React', icon: 'fab fa-react text-cyan-400' },
        { name: 'Next.js', icon: 'fas fa-layer-group text-slate-800 dark:text-white' },
        { name: 'Tailwind CSS', icon: 'fas fa-wind text-cyan-500' },
        { name: 'GSAP', icon: 'fas fa-magic text-green-500' },
      ]
    },
    {
      title: 'Backend',
      subtitle: 'Server & Services',
      icon: 'fas fa-server',
      color: 'purple',
      skills: [
        { name: 'Node.js', icon: 'fab fa-node text-green-500' },
        { name: 'Express.js', icon: 'fas fa-hashtag text-slate-400 dark:text-slate-300' },
        { name: 'Firebase', icon: 'fas fa-fire text-orange-500' },
        { name: 'MongoDB', icon: 'fab fa-envira text-green-500' },
      ]
    },
    {
      title: 'Tools & Others',
      subtitle: 'Development Tools',
      icon: 'fas fa-tools',
      color: 'emerald',
      skills: [
        { name: 'Git & GitHub', icon: 'fab fa-github text-slate-700 dark:text-slate-300' },
        { name: 'VS Code', icon: 'fas fa-code text-blue-500' },
        { name: 'Canva', icon: 'fas fa-paint-brush text-purple-500' },
        { name: 'Photoshop', icon: 'fas fa-palette text-blue-600' },
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

          // Animate skill items within each card
          const skillItems = card.querySelectorAll('.skill-item');
          skillItems.forEach((skillItem, skillIndex) => {
            gsap.fromTo(skillItem,
              { 
                opacity: 0,
                x: -20,
                scale: 0.8
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.5,
                delay: index * 0.15 + skillIndex * 0.1 + 0.3,
                ease: "back.out(1.7)",
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
          <h2 className="text-3xl font-bold text-primary">Technical Skills</h2>
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
            
            <div className="grid grid-cols-2 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div 
                  key={skillIndex} 
                  className="skill-item group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: skillIndex * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 flex items-center justify-center shadow-sm mb-3"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <i className={`${skill.icon} text-2xl`}></i>
                    </motion.div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors text-center">
                      {skill.name}
                    </span>
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