import React, { useState } from 'react';
import { SolarSystemCanvas } from './components/SolarSystemCanvas';
import { PlanetInfo } from './components/PlanetInfo';
import { Controls } from './components/Controls';
import { Planet, planets } from './data/planets';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☀️</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Солнечная система
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Интерактивная обучающая демонстрация</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {isPlaying ? 'Анимация активна' : 'Пауза'}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Canvas area */}
            <div className="flex-1 w-full flex justify-center">
              <div className="w-full max-w-[700px] aspect-square">
                <SolarSystemCanvas
                  isPlaying={isPlaying}
                  speed={speed}
                  selectedPlanet={selectedPlanet}
                  onSelectPlanet={setSelectedPlanet}
                />
              </div>
            </div>

            {/* Side panel */}
            <div className="w-full lg:w-80 space-y-4">
              {/* Planet info */}
              <PlanetInfo planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />

              {/* Planet list */}
              <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Все планеты</h3>
                <div className="grid grid-cols-2 gap-2">
                  {planets.map((planet) => (
                    <button
                      key={planet.name}
                      onClick={() => setSelectedPlanet(planet)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                        selectedPlanet?.name === planet.name
                          ? 'bg-gray-700/80 border border-gray-600/50 text-white'
                          : 'bg-gray-800/30 border border-transparent hover:bg-gray-800/60 text-gray-300 hover:text-white'
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: planet.color }}
                      />
                      <span className="truncate">{planet.nameRu}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <Controls
                isPlaying={isPlaying}
                speed={speed}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                onSpeedChange={setSpeed}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="fixed bottom-0 left-0 right-0 px-4 py-3 text-center pointer-events-none">
        <p className="text-xs text-gray-600">
          Нажмите на планету для получения информации • Используйте элементы управления для изменения скорости
        </p>
      </footer>
    </div>
  );
}

export default App;
