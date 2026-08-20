import { useState, useEffect, useMemo } from 'react';
import { libraryGames } from './data/games';
import type { Game } from './data/games';
import GameCard from './GameCard';
import { Search, Loader2 } from 'lucide-react';

const API_KEY = 'c41dd32e901848f58c4ab182a5c4e0e5';

const ALL_GENRES = [
  'All',
  'FPS',
  'Open World',
  'RPG',
  'Story',
  'Racing',
  'Battle Royale',
  'Action',
  'Horror',
  'Fighting'
] as const;

type PlayStatus = 'All' | 'Played' | 'Not Played';

export default function GameLibrary() {
  const [activeGenre, setActiveGenre] = useState<string>('All');
  const [activeStatus, setActiveStatus] = useState<PlayStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserLibrary = async () => {
      const cacheKey = 'rawg_user_library_cache_v3';
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setGames(JSON.parse(cached));
        setLoading(false);
      } else {
        setLoading(true);
      }

      try {
        // Fetch Played games (beaten, playing)
        const resPlayed = await fetch(`https://api.rawg.io/api/users/arjunisonlinee/games?key=${API_KEY}&statuses=beaten,playing&page_size=40`);
        const dataPlayed = await resPlayed.json();
        
        // Fetch Not Played games (yet, owned, toplay, dropped)
        const resNotPlayed = await fetch(`https://api.rawg.io/api/users/arjunisonlinee/games?key=${API_KEY}&statuses=yet,owned,toplay,dropped&page_size=40`);
        const dataNotPlayed = await resNotPlayed.json();
        
        let allGames: Game[] = [];

        if (dataPlayed.results) {
          const playedGames = dataPlayed.results.map((g: any) => ({
            id: g.id.toString(),
            title: g.name,
            developer: g.released ? `Released: ${g.released.split('-')[0]}` : `Rating: ${g.rating}`,
            genre: g.genres ? g.genres.map((gen: any) => gen.name) : [],
            image: g.background_image || 'https://via.placeholder.com/600x800?text=No+Image',
            playStatus: 'Played'
          }));
          allGames = [...allGames, ...playedGames];
        }

        if (dataNotPlayed.results) {
          const notPlayedGames = dataNotPlayed.results.map((g: any) => ({
            id: g.id.toString(),
            title: g.name,
            developer: g.released ? `Released: ${g.released.split('-')[0]}` : `Rating: ${g.rating}`,
            genre: g.genres ? g.genres.map((gen: any) => gen.name) : [],
            image: g.background_image || 'https://via.placeholder.com/600x800?text=No+Image',
            playStatus: 'Not Played'
          }));
          allGames = [...allGames, ...notPlayedGames];
        }

        if (allGames.length > 0) {
          localStorage.setItem(cacheKey, JSON.stringify(allGames));
          setGames(allGames);
        }
      } catch (error) {
        console.error("Failed to fetch RAWG user library:", error);
        if (!cached) {
           setGames(libraryGames);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserLibrary();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesStatus = activeStatus === 'All' || game.playStatus === activeStatus;
      
      const matchesGenre = activeGenre === 'All' || game.genre.some(g => g.toLowerCase().includes(activeGenre.toLowerCase())) || 
      (activeGenre === 'Open World' && (game.genre.includes('Action') || game.genre.includes('Adventure'))) ||
      (activeGenre === 'Horror' && game.genre.includes('Action'));
      
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.developer.toLowerCase().includes(searchQuery.toLowerCase());
                            
      return matchesStatus && matchesGenre && matchesSearch;
    });
  }, [games, activeGenre, activeStatus, searchQuery]);

  return (
    <div className="w-full mt-24 mb-16 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
        <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md">
          GAME <span className="text-(--primaryColor)">LIBRARY</span>
        </h2>
        
        {/* Search */}
        <div className="relative w-full md:w-64 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/50 group-focus-within:text-(--primaryColor) transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search my games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 outline-none focus:bg-white/10 focus:border-(--primaryColor) transition-all backdrop-blur-md"
          />
        </div>
      </div>

      {/* Play Status Filters */}
      <div className="flex gap-2 mb-4 bg-white/5 p-1 rounded-xl w-fit border border-white/10">
        {(['All', 'Played', 'Not Played'] as PlayStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeStatus === status
                ? 'bg-(--primaryColor) text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Genre Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {ALL_GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 backdrop-blur-sm border ${
              activeGenre === genre
                ? 'bg-white/20 text-white border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Grid or Loading State */}
      {loading ? (
        <div className="w-full py-32 flex flex-col items-center justify-center text-(--primaryColor)">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="text-white/60 text-lg font-medium animate-pulse">Syncing library with RAWG...</p>
        </div>
      ) : filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredGames.map((game) => (
            <div key={game.id} className="relative group">
              <GameCard game={game} />
              {/* Optional small badge to show status on the card */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
                game.playStatus === 'Played' 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                  : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
              }`}>
                {game.playStatus}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-20 flex flex-col items-center justify-center text-white/40 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
          <Search size={48} className="mb-4 opacity-20" />
          <p className="text-xl font-medium">No games found.</p>
          <p className="text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
