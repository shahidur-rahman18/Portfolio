import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  const stats = useMemo(() => [
    { value: '1', suffix: '+', label: 'Years of\nExperience' },
    { value: '10', suffix: '+', label: 'Projects\nShipped' },
    { value: '12', suffix: '+', label: 'Tech Stack\nMastered' },
    { value: '100', suffix: '%', label: 'Client\nSatisfaction' },
  ], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the container
      gsap.fromTo(sectionRef.current, 
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate each stat with counter effect
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          const valueElement = stat.querySelector('.stat-value');
          
          gsap.fromTo(stat,
            { 
              opacity: 0, 
              scale: 0.8,
              y: 30
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Counter animation for numbers
          if (valueElement) {
            const finalValue = parseInt(stats[index].value);
            gsap.fromTo({ value: 0 }, 
              { value: finalValue },
              {
                duration: 1.5,
                delay: index * 0.1 + 0.3,
                ease: "power2.out",
                onUpdate: function() {
                  valueElement.textContent = Math.round(this.targets()[0].value);
                },
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 70%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.5
      }
    }
  };

  return (
    <div ref={sectionRef} className="mt-8 w-full max-w-6xl mx-auto mb-16">
      <motion.div 
        className="grid grid-cols-2 gap-4 lg:gap-6 bg-white dark:bg-[#2c3342] p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            ref={el => statsRef.current[index] = el}
            className={`flex flex-col items-center text-center p-2 ${
              index === 1 || index === 3 ? 'border-l border-gray-200 dark:border-slate-600' : ''
            } ${
              index >= 2 ? 'border-t sm:border-t-0 border-gray-200 dark:border-slate-600 pt-6 sm:pt-2' : ''
            }`}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <div className="text-3xl font-bold text-slate-900 dark:text-white flex items-baseline">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-suffix text-primary text-xl ml-0.5">{stat.suffix}</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-300 mt-1 uppercase tracking-wider font-medium whitespace-pre-line">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatsSection;