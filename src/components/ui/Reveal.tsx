'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * Animation type:
   * - Basic: 'fade' (default), 'slide-up/down/left/right', 'scale/scale-x/scale-y/scale-x-y', 'rotate'
   * - Image-focused: 'image-zoom', 'image-rotate', 'image-flip', 'image-bounce'
   * - Text-focused: 'text-reveal', 'text-typewriter' (requires monospace font for best effect),
   *                'text-fade-up', 'text-scale', 'text-wobble', 'text-count', 'text-arc'
   * - Scroll-connected: 'scroll-zoom'
   */
  type?:
    | 'fade'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'scale'
    | 'scale-x'
    | 'scale-y'
    | 'scale-x-y'
    | 'rotate'
    | 'text-reveal'
    | 'scroll-zoom'
    | 'image-zoom'
    | 'image-rotate'
    | 'image-flip'
    | 'image-bounce'
    | 'text-typewriter'
    | 'text-fade-up'
    | 'text-scale'
    | 'text-wobble'
    | 'text-count'
    | 'text-arc';
  /**
   * Whether to animate children in a staggered fashion
   */
  staggerChildren?: boolean;
  /**
   * Delay between staggered children (in seconds)
   */
  staggerDelay?: number;
  /**
   * Duration of the animation (in seconds)
   */
  duration?: number;
  /**
   * Spring physics configuration for more natural motion
   */
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  /**
   * Text reveal mode for 'text-reveal' type
   */
  textRevealMode?: 'character' | 'word' | 'sentence';
  /**
   * Scroll connection for scroll-based reveals
   */
  // scrollConnection removed - using default offset values
};

export function Reveal({
  children,
  className,
  delay = 0,
  type = 'fade',
  staggerChildren = false,
  staggerDelay = 0.1,
  duration = 0.5,
  springConfig,
  textRevealMode = 'word',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Scroll connection for scroll-based reveals
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  });

  // Define animation variations based on type
  const getInitialState = () => {
    switch (type) {
      case 'fade':
        return { opacity: 0 };
      case 'slide-up':
        return { opacity: 0, y: 20 };
      case 'slide-down':
        return { opacity: 0, y: -20 };
      case 'slide-left':
        return { opacity: 0, x: 20 };
      case 'slide-right':
        return { opacity: 0, x: -20 };
      case 'scale':
        return { opacity: 0, scale: 0.9 };
      case 'scale-x':
        return { opacity: 0, scaleX: 0.9 };
      case 'scale-y':
        return { opacity: 0, scaleY: 0.9 };
      case 'scale-x-y':
        return { opacity: 0, scale: 0.9 };
      case 'rotate':
        return { opacity: 0, rotate: 10 };
      case 'text-reveal':
        return { opacity: 0 };
      case 'scroll-zoom':
        return { opacity: 0, scale: 0.8 };
      case 'image-zoom':
        return { opacity: 0, scale: 0.8 };
      case 'image-rotate':
        return { opacity: 0, scale: 0.8, rotate: 5 };
      case 'image-flip':
        return { opacity: 0, rotateY: 90 };
      case 'image-bounce':
        return { opacity: 0, scale: 0.8, y: 20 };
      case 'text-typewriter':
        return { opacity: 0, width: 0 };
      case 'text-fade-up':
        return { opacity: 0, y: 20 };
      case 'text-scale':
        return { opacity: 0, scale: 0.9 };
      case 'text-wobble':
        return { opacity: 0, rotate: 5 };
      case 'text-count':
        return { opacity: 0 };
      case 'text-arc':
        return { opacity: 0, rotate: 5 };
      default:
        return { opacity: 0, y: 20 }; // fallback to slide-up
    }
  };

  const getAnimateState = () => {
    switch (type) {
      case 'fade':
        return { opacity: 1 };
      case 'slide-up':
        return { opacity: 1, y: 0 };
      case 'slide-down':
        return { opacity: 1, y: 0 };
      case 'slide-left':
        return { opacity: 1, x: 0 };
      case 'slide-right':
        return { opacity: 1, x: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'scale-x':
        return { opacity: 1, scaleX: 1 };
      case 'scale-y':
        return { opacity: 1, scaleY: 1 };
      case 'scale-x-y':
        return { opacity: 1, scale: 1 };
      case 'rotate':
        return { opacity: 1, rotate: 0 };
      case 'text-reveal':
        return { opacity: 1 };
      case 'scroll-zoom':
        return { opacity: 1, scale: 1 };
      case 'image-zoom':
        return { opacity: 1, scale: 1 };
      case 'image-rotate':
        return { opacity: 1, scale: 1, rotate: 0 };
      case 'image-flip':
        return { opacity: 1, rotateY: 0 };
      case 'image-bounce':
        return { opacity: 1, scale: 1, y: 0 };
      case 'text-typewriter':
        return { opacity: 1, width: "100%" };
      case 'text-fade-up':
        return { opacity: 1, y: 0 };
      case 'text-scale':
        return { opacity: 1, scale: 1 };
      case 'text-wobble':
        return { opacity: 1, rotate: 0 };
      case 'text-count':
        return { opacity: 1 };
      case 'text-arc':
        return { opacity: 1, rotate: 0 };
      default:
        return { opacity: 1, y: 0 }; // fallback to slide-up
    }
  };

  // For scroll zoom effect - using scroll-connected values
  const scrollZoomValues = {
    width: useTransform(scrollYProgress, [0, 1], ['15vw', '100vw']),
    height: useTransform(scrollYProgress, [0, 1], ['5vh', '100vh']),
    borderRadius: useTransform(scrollYProgress, [0, 1], [50, 0]),
  };

  // Determine transition configuration
  const getTransitionConfig = () => {
    // For scroll-connected animations, we don't use a fixed transition
    if (type === 'scroll-zoom') {
      return {};
    }

    const baseConfig = {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    };

    // If spring config is provided, use spring physics
    if (springConfig) {
      return {
        ...baseConfig,
        type: 'spring',
        stiffness: springConfig.stiffness ?? 100,
        damping: springConfig.damping ?? 30,
        mass: springConfig.mass ?? 1,
      };
    }

    // For text-typewriter, we want a linear width animation
    if (type === 'text-typewriter') {
      return {
        ...baseConfig,
        width: {
          duration: duration * 2, // Typewriter effect usually takes longer
          ease: 'linear' as const,
        },
      };
    }

    return baseConfig;
  };

  // For staggering children using Framer Motion's native capabilities
  useEffect(() => {
    if (staggerChildren && ref.current) {
      // Clean up any previous CSS-based stagger delays
      const elements = ref.current.querySelectorAll(':scope > *');
      elements.forEach((el) => {
        (el as HTMLElement).style.animationDelay = '';
      });
    }
  }, [staggerChildren, ref]);

  // Special styles for text-typewriter effect
  const typewriterStyle = type === 'text-typewriter'
    ? {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        width: 0,
      }
    : {};

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={getTransitionConfig()}
      style={{
        ...(type === 'scroll-zoom' ? scrollZoomValues : undefined),
        ...typewriterStyle
      }}
      // For staggering children, use Framer Motion's native staggerChildren
      {...(staggerChildren && {
        staggerChildren,
        staggerDelay,
        staggerDirection: 1,
      })}
    >
      {children}
    </motion.div>
  );
}