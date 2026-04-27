import React from 'react';
import { useSnakeGame, GRID_SIZE } from '../hooks/useSnakeGame';

export const SnakeBoard: React.FC = () => {
  const {
    snake,
    food,
    isGameOver,
    isPaused,
    score,
    highScore,
    resetGame,
    pauseOrResume
  } = useSnakeGame();

  // Draw grid
  const cells = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const isSnake = snake.some(segment => segment.x === x && segment.y === y);
      const isHead = snake[0].x === x && snake[0].y === y;
      const isFood = food.x === x && food.y === y;

      cells.push(
        <div
          key={`${x}-${y}`}
          className={`w-full h-full rounded-[2px] transition-all duration-75 ${
            isHead
              ? 'bg-lime-300 neon-glow-lime z-10'
              : isSnake
              ? 'bg-lime-500/80 shadow-[0_0_5px_rgba(163,230,53,0.5)]'
              : isFood
              ? 'bg-pink-500 neon-glow-pink animate-pulse'
              : 'bg-slate-800/30'
          }`}
        />
      );
    }
  }

  return (
    <div className="flex flex-col items-center max-w-2xl w-full mx-auto p-4 sm:p-8">
      
      {/* Score Header */}
      <div className="w-full flex justify-between items-center mb-6 font-mono">
        <div className="flex flex-col">
          <span className="text-slate-400 text-sm uppercase tracking-widest">Score</span>
          <span className="text-3xl text-cyan-400 neon-text-cyan font-bold">{score}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-slate-400 text-sm uppercase tracking-widest">High Score</span>
          <span className="text-3xl text-fuchsia-400 neon-text-fuchsia font-bold">{highScore}</span>
        </div>
      </div>

      {/* Game Board Container */}
      <div className="relative w-full aspect-square max-w-[500px]">
        {/* Glow border wrapper */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 rounded-xl blur-md opacity-40"></div>
        
        {/* Actual Board */}
        <div className="relative w-full h-full bg-slate-900 border border-slate-700/50 rounded-xl p-2 shadow-2xl z-10">
          <div 
            className="w-full h-full grid gap-[1px]" 
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
            }}
          >
            {cells}
          </div>

          {/* Overlays */}
          {(isGameOver || isPaused) && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-6 text-center z-20">
              {isGameOver ? (
                <>
                  <h2 className="text-4xl font-bold text-pink-500 neon-text-fuchsia mb-2">SYSTEM FAILURE</h2>
                  <p className="text-slate-300 font-mono mb-8">Score: {score}</p>
                  <button 
                    onClick={resetGame}
                    className="group relative px-6 py-3 font-mono font-bold text-slate-100 transition-all hover:text-white"
                  >
                    <span className="absolute inset-0 w-full h-full bg-fuchsia-600 border border-fuchsia-400 rounded-md neon-glow-fuchsia transition-all group-hover:bg-fuchsia-500 group-hover:neon-glow-fuchsia-strong"></span>
                    <span className="relative">REBOOT [SPACE]</span>
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold text-cyan-400 neon-text-cyan mb-8 uppercase tracking-widest">Paused</h2>
                  <button 
                    onClick={pauseOrResume}
                    className="group relative px-6 py-3 font-mono font-bold text-slate-100 transition-all hover:text-white"
                  >
                    <span className="absolute inset-0 w-full h-full bg-cyan-600 border border-cyan-400 rounded-md neon-glow-cyan transition-all group-hover:bg-cyan-500 group-hover:neon-glow-cyan-strong"></span>
                    <span className="relative">RESUME [SPACE]</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-8 text-center text-slate-500 font-mono text-sm max-w-sm">
        <p>Use arrow keys or WASD to control the serpent.</p>
        <p className="mt-1">Press Space to Pause/Resume.</p>
      </div>
    </div>
  );
};
