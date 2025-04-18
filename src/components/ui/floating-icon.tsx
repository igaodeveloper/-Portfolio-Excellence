import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type FloatingIconProps = {
  icon: ReactNode;
  className?: string;
  iconClassName?: string;
  delay?: number;
  duration?: number;
  amplitude?: number;
  hoverable?: boolean;
  onClick?: () => void;
};

export function FloatingIcon({
  icon,
  className,
  iconClassName,
  delay = 0,
  duration = 3,
  amplitude = 10,
  hoverable = true,
  onClick,
}: FloatingIconProps) {
  return (
    <motion.div
      className={cn(
        'relative flex items-center justify-center',
        hoverable ? 'cursor-pointer' : '',
        className,
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 10,
        delay,
      }}
      whileHover={hoverable ? { scale: 1.1 } : undefined}
      whileTap={hoverable ? { scale: 0.95 } : undefined}
      onClick={onClick}
    >
      <motion.div
        className={cn('relative z-10', iconClassName)}
        animate={{
          y: [-amplitude, 0, -amplitude],
        }}
        transition={{
          repeat: Infinity,
          duration,
          ease: 'easeInOut',
          delay,
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}

type FloatingIconGridProps = {
  icons: Array<{
    icon: ReactNode;
    id: string | number;
    className?: string;
  }>;
  gridClassName?: string;
  itemClassName?: string;
  staggerDelay?: number;
};

export function FloatingIconGrid({
  icons,
  gridClassName,
  itemClassName,
  staggerDelay = 0.1,
}: FloatingIconGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4',
        gridClassName,
      )}
    >
      {icons.map((item, index) => (
        <FloatingIcon
          key={item.id}
          icon={item.icon}
          className={cn('w-full aspect-square', itemClassName, item.className)}
          delay={index * staggerDelay}
          amplitude={Math.random() * 8 + 5}
          duration={Math.random() * 2 + 2}
        />
      ))}
    </div>
  );
}

type PulsatingIconProps = {
  icon: ReactNode;
  className?: string;
  iconClassName?: string;
  pulseColor?: string;
  onClick?: () => void;
};

export function PulsatingIcon({
  icon,
  className,
  iconClassName,
  pulseColor = 'rgba(0, 210, 223, 0.2)',
  onClick,
}: PulsatingIconProps) {
  return (
    <motion.div
      className={cn('relative flex items-center justify-center', className)}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50, damping: 10 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            `0 0 0 0px ${pulseColor}`,
            `0 0 0 10px ${pulseColor}`,
            `0 0 0 20px ${pulseColor}`,
            `0 0 0 0px ${pulseColor}`,
          ],
          scale: [1, 1.1, 1.2, 1],
          opacity: [0.7, 0.5, 0.2, 0],
        }}
        transition={{
          duration: 2.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      <div className={cn('relative z-10', iconClassName)}>{icon}</div>
    </motion.div>
  );
}
