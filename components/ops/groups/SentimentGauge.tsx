import { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface SentimentGaugeProps {
  sentiment: string | null;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const SENTIMENT_CONFIG = {
  positivo: { color: '#22c55e', colorLight: '#86efac', angle: 150, label: 'Positivo' },
  negativo: { color: '#ef4444', colorLight: '#fca5a5', angle: 30, label: 'Negativo' },
  neutro: { color: '#f59e0b', colorLight: '#fcd34d', angle: 90, label: 'Neutro' },
  misto: { color: '#8b5cf6', colorLight: '#c4b5fd', angle: 90, label: 'Misto' },
} as const;

const SIZE_CONFIG = {
  sm: { width: 100, height: 55, strokeWidth: 10, fontSize: 10, needleLength: 32 },
  md: { width: 140, height: 75, strokeWidth: 12, fontSize: 12, needleLength: 45 },
  lg: { width: 180, height: 95, strokeWidth: 14, fontSize: 14, needleLength: 58 },
};

export default function SentimentGauge({
  sentiment,
  size = 'md',
  showLabel = true,
  className,
}: SentimentGaugeProps) {
  const uniqueId = useId();
  const normalizedSentiment = sentiment?.toLowerCase() || 'neutro';
  const config = SENTIMENT_CONFIG[normalizedSentiment as keyof typeof SENTIMENT_CONFIG] || SENTIMENT_CONFIG.neutro;
  const sizeConfig = SIZE_CONFIG[size];

  // Unique IDs for SVG elements
  const gradientId = `gauge-gradient-${uniqueId}`;
  const glowId = `gauge-glow-${uniqueId}`;
  const needleShadowId = `needle-shadow-${uniqueId}`;
  const bgGradientId = `bg-gradient-${uniqueId}`;

  const { width, height, strokeWidth, needleLength } = sizeConfig;
  const centerX = width / 2;
  const centerY = height;
  const radius = height - strokeWidth / 2 - 8;
  const circumference = Math.PI * radius;

  // Calculate needle angle (0° = left, 90° = center/top, 180° = right)
  const needleAngle = config.angle;

  // Arc path for the gauge
  const arcPath = `
    M ${centerX - radius} ${centerY}
    A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}
  `;

  // Calculate progress arc
  const progressRatio = needleAngle / 180;
  const progressLength = circumference * progressRatio;

  // Calculate needle end point using trigonometry
  // Angle: 0° = left (negative), 90° = top (neutral), 180° = right (positive)
  const needleRad = ((180 - needleAngle) * Math.PI) / 180;
  const needleEndX = centerX + Math.cos(needleRad) * (needleLength - 5);
  const needleEndY = centerY - Math.sin(needleRad) * (needleLength - 5);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg
        width={width}
        height={height + 15}
        viewBox={`0 0 ${width} ${height + 15}`}
        className="overflow-visible"
      >
        <defs>
          {/* Main gradient (red → yellow → green) */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="35%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="65%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Background gradient for depth */}
          <linearGradient id={bgGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.2" />
          </linearGradient>

          {/* Glow filter */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Needle shadow */}
          <filter id={needleShadowId} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Background arc with depth */}
        <path
          d={arcPath}
          fill="none"
          stroke={`url(#${bgGradientId})`}
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
        />

        {/* Main colored arc (full gradient, dimmed) */}
        <path
          d={arcPath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.25}
        />

        {/* Active progress arc */}
        <motion.path
          d={arcPath}
          fill="none"
          stroke={config.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progressLength }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
          }}
          filter={`url(#${glowId})`}
        />

        {/* Subtle tick marks */}
        {[0, 45, 90, 135, 180].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const innerRadius = radius - strokeWidth / 2 - 2;
          const outerRadius = radius + strokeWidth / 2 + 2;
          const x1 = centerX - innerRadius * Math.cos(rad);
          const y1 = centerY - innerRadius * Math.sin(rad);
          const x2 = centerX - outerRadius * Math.cos(rad);
          const y2 = centerY - outerRadius * Math.sin(rad);
          const isCenter = angle === 90;
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--foreground))"
              strokeWidth={isCenter ? 2 : 1}
              opacity={isCenter ? 0.4 : 0.2}
              strokeLinecap="round"
            />
          );
        })}

        {/* Needle - calculated with trigonometry */}
        <motion.line
          x1={centerX}
          y1={centerY}
          initial={{ x2: centerX, y2: centerY }}
          animate={{ x2: needleEndX, y2: needleEndY }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 15,
          }}
          stroke={config.color}
          strokeWidth={3}
          strokeLinecap="round"
          filter={`url(#${needleShadowId})`}
        />
        {/* Needle tip */}
        <motion.circle
          initial={{ cx: centerX, cy: centerY }}
          animate={{ cx: needleEndX, cy: needleEndY }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 15,
          }}
          r={4}
          fill={config.color}
        />

        {/* Center hub with layered circles */}
        <circle
          cx={centerX}
          cy={centerY}
          r={12}
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
          strokeWidth={1}
        />
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={8}
          fill={config.color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.5,
          }}
        />
        <circle
          cx={centerX - 2}
          cy={centerY - 2}
          r={3}
          fill={config.colorLight}
          opacity={0.5}
        />

        {/* Min/Max labels */}
        <text
          x={centerX - radius - 5}
          y={centerY + 12}
          fill="hsl(var(--muted-foreground))"
          fontSize={9}
          fontWeight="500"
          textAnchor="middle"
          opacity={0.7}
        >
          -
        </text>
        <text
          x={centerX + radius + 5}
          y={centerY + 12}
          fill="hsl(var(--muted-foreground))"
          fontSize={9}
          fontWeight="500"
          textAnchor="middle"
          opacity={0.7}
        >
          +
        </text>
      </svg>

      {/* Sentiment label with pulse animation */}
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-1 flex items-center gap-1.5"
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: config.color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span
            className="font-semibold text-sm tracking-wide"
            style={{ color: config.color }}
          >
            {config.label}
          </span>
        </motion.div>
      )}
    </div>
  );
}
