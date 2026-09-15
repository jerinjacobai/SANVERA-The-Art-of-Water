import React from 'react';
import { Navigation, Eye, Play, Pause } from 'lucide-react';
import { ShowroomZone, SHOWROOM_ZONES } from './ShowroomCanvas';
import { ProductFinish } from '../../types';
import { FINISH_OPTIONS } from '../../data/finishes';

interface ShowroomTelemetryProps {
  currentZone: ShowroomZone;
  coords: { x: number; y: number; z: number };
  progress: number;
  isFreeExploration: boolean;
  onToggleMode: () => void;
  onSelectZone: (zone: ShowroomZone) => void;
  activeFinish: ProductFinish;
  onSelectFinish: (finish: ProductFinish) => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
}

export const ShowroomTelemetry: React.FC<ShowroomTelemetryProps> = ({
  currentZone,
  coords,
  progress,
  isFreeExploration,
  onToggleMode,
  onSelectZone,
  activeFinish,
  onSelectFinish,
  isAutoPlaying,
  onToggleAutoPlay,
}) => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 border-t border-hair bg-void/80 backdrop-blur-md text-ink select-none">
      {/* Path progress indicator line */}
      <div
        className="h-0.5 bg-brass transition-all duration-150"
        style={{ width: `${Math.max(2, Math.min(100, progress * 100))}%` }}
      />

      <div className="mx-auto max-w-[1800px] px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Cell 1: Zone Selector & Name */}
        <div className="flex items-center gap-4 min-w-[240px]">
          <div className="flex flex-col">
            <span className="label-mono text-brass text-[9px]">
              Zone {currentZone.number} / 04
            </span>
            <span className="font-display font-medium text-sm sm:text-base text-ink tracking-tight truncate max-w-xs">
              {currentZone.name}
            </span>
          </div>

          {/* Quick Zone Skip Dropdown/Pills */}
          <div className="hidden xl:flex items-center gap-1.5 border-l border-hair pl-4">
            {SHOWROOM_ZONES.map((z) => (
              <button
                key={z.id}
                onClick={() => onSelectZone(z)}
                className={`label-mono px-2 py-1 border text-[9px] transition-colors ${
                  currentZone.id === z.id
                    ? 'border-ink bg-ink text-void'
                    : 'border-hair text-smoke hover:border-mist hover:text-ink'
                }`}
              >
                {z.number}
              </button>
            ))}
          </div>
        </div>

        {/* Cell 2: Spatial Coordinates & Elevation */}
        <div className="hidden lg:flex items-center gap-6 border-l border-hair pl-6">
          <div>
            <span className="label-mono text-smoke block text-[8px]">World Position</span>
            <span className="label-mono text-mist text-[10px]">
              X:{coords.x} Y:{coords.y} Z:{coords.z}
            </span>
          </div>
          <div>
            <span className="label-mono text-smoke block text-[8px]">Eye Elevation</span>
            <span className="label-mono text-mist text-[10px]">1.68m AGL</span>
          </div>
        </div>

        {/* Cell 3: Alloy Finish Switcher */}
        <div className="hidden md:flex items-center gap-3 border-l border-hair pl-6">
          <span className="label-mono text-smoke text-[9px]">Plinth Finish:</span>
          <div className="flex items-center gap-1.5">
            {FINISH_OPTIONS.map((f) => (
              <button
                key={f.id}
                onClick={() => onSelectFinish(f.id)}
                title={f.name}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  activeFinish === f.id
                    ? 'border-ink scale-125 ring-1 ring-ink/40'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: f.hex }}
              />
            ))}
          </div>
        </div>

        {/* Cell 4: Mode Controls (Guided vs Free Cam) */}
        <div className="flex items-center gap-3">
          {/* Auto play walkthrough */}
          {!isFreeExploration && (
            <button
              onClick={onToggleAutoPlay}
              className="flex items-center gap-2 px-3 py-1.5 border border-hair hover:border-ink text-mist hover:text-ink label-mono text-[9px] transition-colors"
              title="Auto-play walkthrough along guided spline"
            >
              {isAutoPlaying ? <Pause size={10} /> : <Play size={10} />}
              <span>{isAutoPlaying ? 'Pause Tour' : 'Auto Tour'}</span>
            </button>
          )}

          {/* Mode Switcher Toggle Button */}
          <button
            onClick={onToggleMode}
            className={`flex items-center gap-2 px-4 py-1.5 border label-mono text-[10px] tracking-wider transition-all duration-300 ${
              isFreeExploration
                ? 'border-brass text-brass bg-brass/10'
                : 'border-ink bg-ink text-void'
            }`}
          >
            {isFreeExploration ? (
              <>
                <Eye size={12} />
                <span>Mode: Free Exploration</span>
              </>
            ) : (
              <>
                <Navigation size={12} />
                <span>Mode: Guided Spline</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
