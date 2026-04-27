import React from 'react';
import { SnakeBoard } from './components/SnakeBoard';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }}>
      </div>
      
      {/* Header */}
      <header className="relative z-10 sticky top-0 bg-slate-900/80 backdrop-blur-md border-b border-fuchsia-500/20 shadow-[0_4px_30px_rgba(217,70,239,0.1)] py-4">
        <h1 className="text-3xl font-bold text-center tracking-[0.2em] font-mono uppercase text-pink-500 neon-text-fuchsia">
          Neon<span className="text-cyan-400 neon-text-cyan">Serpent</span>
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center relative z-10 w-full xl:max-w-7xl mx-auto xl:grid xl:grid-cols-12 xl:gap-8 px-4 xl:px-8 py-8 xl:py-12">
        <div className="w-full xl:col-span-8 flex justify-center items-center">
          <SnakeBoard />
        </div>
        
        <div className="w-full mt-8 xl:mt-0 xl:col-span-4 flex flex-col items-center justify-center">
          <MusicPlayer />
          
           {/* Decor/Instructions inside sidebar on large screens */}
           <div className="hidden xl:flex mt-12 flex-col items-center gap-4 opacity-50 p-6 border border-slate-700/50 rounded-xl bg-slate-900/40 backdrop-blur-sm">
             <div className="text-xs uppercase tracking-widest font-mono text-cyan-400 text-center mb-2">Controls</div>
             <div className="grid grid-cols-3 gap-2 [&>kbd]:flex [&>kbd]:items-center [&>kbd]:justify-center [&>kbd]:h-10 [&>kbd]:w-10 [&>kbd]:bg-slate-800 [&>kbd]:border [&>kbd]:border-b-4 [&>kbd]:border-slate-700 [&>kbd]:rounded-lg [&>kbd]:font-mono [&>kbd]:text-slate-300">
               <div />
               <kbd>W</kbd>
               <div />
               <kbd>A</kbd>
               <kbd>S</kbd>
               <kbd>D</kbd>
             </div>
             <div className="mt-4 flex w-full">
               <kbd className="w-full h-10 flex items-center justify-center bg-slate-800 border border-b-4 border-slate-700 rounded-lg font-mono text-slate-300 tracking-wider">SPACE</kbd>
             </div>
             <div className="text-[10px] mt-2 text-slate-500 font-mono text-center">Maintain window focus, use keyboard</div>
           </div>
        </div>
      </main>
      
      {/* Ambient static bottom glow */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-fuchsia-900/20 to-transparent pointer-events-none -z-0"></div>
    </div>
  );
}
