import React from 'react';
import { Planet } from '../data/planets';

interface PlanetInfoProps {
  planet: Planet | null;
  onClose: () => void;
}

export const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet, onClose }) => {
  if (!planet) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">🪐</div>
        <p className="text-gray-400 text-sm">
          Нажмите на планету, чтобы узнать о ней больше
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full shadow-lg"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${lightenColor(planet.color, 40)}, ${planet.color})`,
              boxShadow: `0 0 12px ${planet.color}60`
            }}
          />
          <div>
            <h2 className="text-xl font-bold text-white">{planet.nameRu}</h2>
            <p className="text-xs text-gray-400">{planet.name}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {planet.description}
      </p>

      <div className="space-y-3">
        <InfoRow icon="📏" label="Радиус" value={planet.realRadius} />
        <InfoRow icon="☀️" label="Расстояние от Солнца" value={planet.distanceFromSun} />
        <InfoRow icon="🔄" label="Орбитальный период" value={planet.orbitalPeriod} />
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-3 py-2">
    <span className="text-lg">{icon}</span>
    <div className="flex-1">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  </div>
);

function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
