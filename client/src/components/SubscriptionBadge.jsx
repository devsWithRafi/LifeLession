'use client';

import { useTheme } from 'next-themes';
import { LiquidMetalButton } from './ui/liquid-metal-button';
import { cn } from '@/lib/utils';

const SubscriptionBadge = ({ children, className, hoverMode = false }) => {
  const { theme } = useTheme();

  return theme === 'dark' ? (
    <LiquidMetalButton
      theme="gold"
      className={cn(
        'rounded-full relative dark:bg-background bg-transparent max-h-6 text-xs',
        !hoverMode && 'pointer-events-none select-none',
        className,
      )}
    >
      {children}
    </LiquidMetalButton>
  ) : (
    <LiquidMetalButton
      theme="gold"
      className={cn(
        'rounded-full relative max-h-6 text-xs',
        !hoverMode && 'pointer-events-none select-none',
        className,
      )}
    >
      {children}
    </LiquidMetalButton>
  );
};

export default SubscriptionBadge;
