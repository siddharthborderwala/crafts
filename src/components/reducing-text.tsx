import { useEffect, useState } from "react";
import { motion } from "motion/react";

export const ReducingText = ({
  initialText,
  duration = 100,
}: {
  initialText: string;
  duration?: number;
}) => {
  const [text, setText] = useState(initialText);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((currentText) => {
        const newText = currentText.substring(0, currentText.length - 1);
        if (newText.length === 0) {
          setIsTyping(false);
          clearInterval(interval);
        }
        return newText;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [initialText, duration]);

  return (
    <div className="relative text-2xl font-normal h-[2.1rem]">
      {text}
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 w-[2px] rounded-full h-[1.2em] bg-[hsl(272,66%,56%)] ml-[2px]"
        animate={isTyping ? undefined : { opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 0.8,
          times: [0, 0.8, 0.8, 1],
          repeat: Infinity,
          ease: "anticipate",
        }}
      />
    </div>
  );
};
