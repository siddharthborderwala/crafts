"use client";

import { motion, type MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../utils";

interface BackspaceAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
  customDelays?: Array<{ indexOfDelay: number; duration: number }>;
}

export function BackspaceAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  customDelays = [],
  ...props
}: BackspaceAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>(children);
  const [started, setStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!startOnView) {
      setIsTyping(false);
      timeoutRef.current = setTimeout(() => {
        setStarted(true);
        timeoutRef.current = setTimeout(() => {
          setShowCursor(true);
        }, 500);
      }, delay);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTyping(false);
          timeoutRef.current = setTimeout(() => {
            setStarted(true);
            timeoutRef.current = setTimeout(() => {
              setShowCursor(true);
            }, 500);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = children.length;
    const backspaceNextChar = () => {
      if (currentIndex <= 0) {
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      setDisplayedText(children.substring(0, currentIndex));

      const nextCharDelay = customDelays.find(
        (d) => d.indexOfDelay === children.length - currentIndex,
      );
      const delayDuration = nextCharDelay ? nextCharDelay.duration : duration;

      timeoutRef.current = setTimeout(() => {
        currentIndex--;
        backspaceNextChar();
      }, delayDuration);
    };

    backspaceNextChar();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [children, duration, started, customDelays]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "relative text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className,
      )}
      {...props}
    >
      {displayedText}
      {(!isTyping || !started) && showCursor && (
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 w-[2px] rounded-full h-[1.2em] bg-current ml-[2px]"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            times: [0, 0.8, 0.8, 1],
            repeat: Infinity,
            ease: "anticipate",
          }}
        />
      )}
    </MotionComponent>
  );
}
