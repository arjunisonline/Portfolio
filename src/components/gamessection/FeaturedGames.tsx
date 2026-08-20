import { featuredGames } from './data/games';

export default function FeaturedGames() {
  return (
    <div className="w-full mt-12 mb-20 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {featuredGames.map((game, idx) => {
          // Make the first item take full width on large screens to break the grid monotony
          const isLarge = idx === 0;
          return (
            <div
              key={game.id}
              className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-700 cursor-pointer shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] ${
                isLarge ? 'lg:col-span-2 aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'
              }`}
            >
              {/* Background Artwork */}
              <img
                src={game.image}
                alt={game.title}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-90" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-black uppercase tracking-widest text-(--primaryColor) bg-black/50 backdrop-blur-md rounded-md border border-white/10">
                    {game.developer}
                  </span>
                  {game.genre.map((g) => (
                    <span key={g} className="px-3 py-1 text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-md rounded-md border border-white/10">
                      {g}
                    </span>
                  ))}
                </div>
                
                <h3 className={`font-black text-white drop-shadow-xl leading-none mb-4 ${isLarge ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'}`}>
                  {game.title}
                </h3>
                
                <p className="text-white/60 md:text-lg max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {game.description}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-(--primaryColor) font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span>Explore Title</span>
                  <span className="transform transition-transform group-hover:translate-x-2">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
