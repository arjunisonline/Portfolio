import { featuredGames } from './data/games';

export default function FeaturedGames() {
  return (
    <div className="w-full mt-12 mb-20 px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {featuredGames.map((game) => (
          <div
            key={game.id}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer shadow-lg aspect-video"
          >
            {/* Background Artwork */}
            <img
              src={game.image}
              alt={game.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-(--primaryColor) bg-black/60 backdrop-blur-md rounded border border-white/10">
                  {game.developer}
                </span>
                {game.genre.slice(0, 1).map((g) => (
                  <span key={g} className="px-2 py-0.5 text-[10px] font-semibold text-white/80 bg-white/10 backdrop-blur-md rounded border border-white/10">
                    {g}
                  </span>
                ))}
              </div>
              
              <h3 className="font-bold text-white leading-tight mb-2 text-xl md:text-2xl drop-shadow-md">
                {game.title}
              </h3>
              
              <p className="text-white/70 text-xs line-clamp-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                {game.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
