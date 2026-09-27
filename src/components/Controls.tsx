import React from 'react';

interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  speed,
  onTogglePlay,
  onSpeedChange,
}) => {
  const speedPresets = [
    { label: '0.25×', value: 0.25 },
    { label: '0.5×', value: 0.5 },
    { label: '1×', value: 1 },
    { label: '2×', value: 2 },
    { label: '5×', value: 5 },
  ];

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Play/Pause */}
        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
          }`}
        >
          {isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              Пауза
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Воспроизвести
            </>
          )}
        </button>

        {/* Speed controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 mr-1">Скорость:</span>
          {speedPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onSpeedChange(preset.value)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                speed === preset.value
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-500/40'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Speed slider */}
      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs text-gray-500">🐢</span>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="flex-1 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-blue-500/30
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:bg-blue-400"
        />
        <span className="text-xs text-gray-500">🚀</span>
        <span className="text-xs text-blue-400 font-mono w-12 text-right">{speed.toFixed(1)}×</span>
      </div>
    </div>
  );
};
