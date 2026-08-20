import type { Game } from './data/games';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transform-gpu will-change-transform hover:-translate-y-2">
      {/* Background Image */}
      <img
        src={game.image}
        alt={game.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      
      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md leading-tight mb-2">
          {game.title}
        </h3>
        
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-xs font-semibold text-(--primaryColor) uppercase tracking-wider">
            {game.developer}
          </span>
          <div className="flex flex-wrap gap-2 mt-1">
            {game.genre.map((g) => (
              <span key={g} className="text-[10px] px-2 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 border border-white/10">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
