import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import SplashScreen from './components/SplashScreen';
import AnimatedBackground from './components/AnimatedBackground';
import './index.css';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check for saved user preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className={`font-body min-h-screen flex flex-col transition-colors duration-300 pb-24 lg:pb-0 relative ${
      isDark 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-slate-50 text-slate-800'
    }`}>
      <AnimatedBackground />
      <Navigation />
      
      <main className="flex-grow flex flex-col justify-center px-6 pt-8 pb-safe overflow-x-hidden relative z-10">
        <HeroSection />
        <StatsSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
       
      </main>
      
      <Footer />
      <MobileNavigation />
    </div>
  );
}

export default App;