"use client";

import { motion, type MotionProps } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../utils";

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  customDelays?: Array<{ indexOfDelay: number; duration: number }>;
}

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  customDelays = [],
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInitialCursor, setShowInitialCursor] = useState(delay > 400);

  useEffect(() => {
    if (delay > 400) {
      const timeout = setTimeout(() => {
        setShowInitialCursor(false);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [delay]);

  useEffect(() => {
    let i = 0;

    const typeNextChar = () => {
      if (i >= children.length) {
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      setDisplayedText(children.substring(0, i + 1));

      const nextCharDelay = customDelays.find((d) => d.indexOfDelay === i);
      if (nextCharDelay) {
        setTimeout(() => {
          i++;
          typeNextChar();
        }, nextCharDelay.duration);
      } else {
        setTimeout(() => {
          i++;
          typeNextChar();
        }, duration);
      }
    };

    const timeout = setTimeout(() => {
      typeNextChar();
    }, delay);

    return () => clearTimeout(timeout);
  }, [children, duration, customDelays, delay]);

  return (
    <MotionComponent
      className={cn("relative text-4xl font-bold leading-[5rem]", className)}
      {...props}
    >
      {displayedText}
      {showInitialCursor ? (
        <span className="absolute top-1/2 -translate-y-1/2 w-[2px] rounded-full h-[1.2em] bg-[hsl(272,66%,56%)] ml-[2px]" />
      ) : (
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 w-[2px] rounded-full h-[1.2em] bg-[hsl(272,66%,56%)] ml-[2px]"
          animate={isTyping ? undefined : { opacity: [1, 1, 0, 0] }}
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
