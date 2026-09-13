import React from 'react';

interface WaveBandProps {
  reverse?: boolean;
  opacity?: number;
  className?: string;
}

export const WaveBand: React.FC<WaveBandProps> = ({
  reverse = false,
  opacity = 0.25,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-[120px] sm:h-[160px] lg:h-[200px] overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 2000 150"
        preserveAspectRatio="none"
        className="w-[200%] h-full block"
        style={{
          animation: `wave-drift ${reverse ? '36s' : '28s'} linear infinite ${
            reverse ? 'reverse' : 'normal'
          }`,
        }}
      >
        <path
          d="M0,80 C220,10 430,150 650,76 S1060,5 1300,76 S1680,160 2000,60"
          fill="none"
          stroke="#F2F0EA"
          strokeWidth="1"
          opacity={opacity}
        />
        <path
          d="M0,97 C200,28 470,125 690,84 S1090,30 1310,85 S1670,145 2000,72"
          fill="none"
          stroke="#F2F0EA"
          strokeWidth="1"
          opacity={opacity * 0.75}
        />
        <path
          d="M0,63 C250,95 430,5 690,60 S1080,120 1330,63 S1700,0 2000,76"
          fill="none"
          stroke="#F2F0EA"
          strokeWidth="1"
          opacity={opacity * 0.5}
        />
        <path
          d="M0,110 C250,40 500,140 700,104 S1100,20 1400,102 S1730,150 2000,90"
          fill="none"
          stroke="#F2F0EA"
          strokeWidth="1"
          opacity={opacity * 0.35}
        />
      </svg>

      {/* Edge gradient dissolves */}
      <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void" />

      <style>{`
        @keyframes wave-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
