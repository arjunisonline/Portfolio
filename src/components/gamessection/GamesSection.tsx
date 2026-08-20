import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Gamepad2, Trophy, BookOpen, Globe, ArrowRight } from 'lucide-react';
import FeaturedGames from './FeaturedGames';

gsap.registerPlugin(ScrollTrigger);

export default function GamesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Reveal animation for stats
    gsap.fromTo(
      '.stat-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 85%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      id="games" 
      ref={sectionRef} 
      className="min-h-dvh flex flex-col pt-32 pb-20 relative overflow-hidden"
    >
      <div className="mx-4 md:mx-30">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm md:text-base font-bold tracking-[0.3em] text-(--primaryColor) uppercase mb-3">
              Player Profile
            </h2>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              After Hours
            </h1>
            <p className="text-lg md:text-2xl text-white/50 font-light">
              When I'm not building things, I'm probably breaking things in a game. Welcome to my digital archive.
            </p>
          </div>
        </div>

        {/* Player Stats */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="stat-card flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Gamepad2 className="text-(--primaryColor) mb-3" size={24} />
            <span className="text-xs uppercase tracking-wider text-white/40 font-bold mb-1">Fav Genre</span>
            <span className="text-lg font-semibold text-white">Story-Driven / RPG</span>
          </div>
          <div className="stat-card flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Trophy className="text-(--primaryColor) mb-3" size={24} />
            <span className="text-xs uppercase tracking-wider text-white/40 font-bold mb-1">Competitive</span>
            <span className="text-lg font-semibold text-white">Valorant</span>
          </div>
          <div className="stat-card flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <BookOpen className="text-(--primaryColor) mb-3" size={24} />
            <span className="text-xs uppercase tracking-wider text-white/40 font-bold mb-1">Best Story</span>
            <span className="text-lg font-semibold text-white">The Last of Us</span>
          </div>
          <div className="stat-card flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Globe className="text-(--primaryColor) mb-3" size={24} />
            <span className="text-xs uppercase tracking-wider text-white/40 font-bold mb-1">Best Open World</span>
            <span className="text-lg font-semibold text-white">Red Dead Redemption 2</span>
          </div>
        </div>

        <FeaturedGames />
        
        <div className="flex justify-center mt-12 mb-10">
          <Link 
            to="/games"
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-(--primaryColor) hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-md text-white font-bold tracking-widest uppercase text-sm"
          >
            Explore Games I Played
            <ArrowRight size={18} className="text-(--primaryColor) transform transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}
