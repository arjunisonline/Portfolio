import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GithubData {
  total: { [year: string]: number };
  contributions: ContributionDay[];
}

export default function GithubGraph() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/arjunisonline');
        const json: GithubData = await response.json();
        
        // GitHub shows the last 365 days. Let's filter the data.
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        
        const lastYearContributions = json.contributions.filter(day => {
          const date = new Date(day.date);
          return date >= oneYearAgo && date <= today;
        });

        // Sort chronologically (oldest to newest)
        lastYearContributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        setData(lastYearContributions);
        
        // Calculate total for the last year
        const lastYearTotal = lastYearContributions.reduce((sum, day) => sum + day.count, 0);
        setTotal(lastYearTotal);
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  // Auto-scroll to the rightmost side on load so user sees latest contributions
  useEffect(() => {
    if (!loading && data.length > 0 && scrollContainerRef.current) {
      // Small timeout ensures the DOM has updated sizes before scrolling
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }, 50);
    }
  }, [loading, data]);

  useGSAP(() => {
    if (!loading && data.length > 0) {
      gsap.fromTo(
        '.github-square',
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: {
            amount: 1.5,
            from: "random"
          },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%'
          }
        }
      );
    }
  }, [loading, data]);

  // Color mapping based on primaryColor (using opacity steps)
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-white/5';
      case 1: return 'bg-(--primaryColor) opacity-30';
      case 2: return 'bg-(--primaryColor) opacity-60';
      case 3: return 'bg-(--primaryColor) opacity-80';
      case 4: return 'bg-(--primaryColor) opacity-100';
      default: return 'bg-white/5';
    }
  };

  return (
    <div className="w-full mt-24 mb-10 px-4 md:px-0 flex justify-center">
      <div ref={containerRef} className="w-full max-w-5xl flex flex-col items-center bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md hover:border-(--primaryColor) transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-0">
          GitHub <span className="text-(--primaryColor)">Contributions</span>
        </h2>
        <div className="text-white/60 text-sm">
          {loading ? 'Loading...' : `${total} contributions in the last year`}
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="w-full max-w-5xl overflow-x-auto pb-4 pt-8 custom-scrollbar scroll-smooth"
      >
        {loading ? (
          <div className="h-40 w-full flex items-center justify-center text-white/40">
            Fetching GitHub data...
          </div>
        ) : (
          <div className="w-full flex justify-start md:justify-center min-w-max">
            <div 
              className="grid gap-1 px-4 md:px-0"
              style={{ 
                gridTemplateRows: 'repeat(7, 1fr)',
                gridAutoFlow: 'column'
              }}
            >
              {data.map((day) => {
                return (
                  <div
                    key={day.date}
                    className={`github-square w-3 h-3 md:w-3.5 md:h-3.5 rounded-sm ${getLevelColor(day.level)} hover:ring-2 hover:ring-white transition-all cursor-pointer group relative`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {day.count} contributions on {new Date(day.date).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {!loading && (
        <div className="flex items-center gap-2 mt-4 text-xs text-white/60">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-white/5"></div>
          <div className="w-3 h-3 rounded-sm bg-(--primaryColor) opacity-30"></div>
          <div className="w-3 h-3 rounded-sm bg-(--primaryColor) opacity-60"></div>
          <div className="w-3 h-3 rounded-sm bg-(--primaryColor) opacity-80"></div>
          <div className="w-3 h-3 rounded-sm bg-(--primaryColor) opacity-100"></div>
          <span>More</span>
        </div>
      )}
      </div>
    </div>
  );
}

