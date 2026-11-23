'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'ghost';

type MagneticButtonProps = {
  children: React.ReactNode;
  /** Internal route (rendered with next/link) */
  to?: string;
  /** External URL */
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const base =
'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors';

const variants: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/30',
  ghost: 'border border-slate-300 bg-white/90 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/60 shadow-sm backdrop-blur'
};

const spring = { stiffness: 250, damping: 18, mass: 0.4 };

const MotionLink = motion.create(Link);

/**
 * Button / link that is gently pulled toward the cursor.
 * Uses motion values, so mouse movement never triggers a React re-render.
 */
export function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  disabled
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const shared = {
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x, y },
    className: cn(base, variants[variant], disabled && 'pointer-events-none opacity-60', className)
  };

  if (to) {
    return (
      <MotionLink {...shared} ref={ref as React.Ref<HTMLAnchorElement>} href={to}>
        {children}
      </MotionLink>);

  }
  if (href) {
    return (
      <motion.a {...shared} ref={ref as React.Ref<HTMLAnchorElement>} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </motion.a>);

  }
  return (
    <motion.button {...shared} ref={ref as React.Ref<HTMLButtonElement>} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </motion.button>);

}
