import { useEffect, useState } from "react";
import { TypingAnimation } from "../components/typing-animation";
import { AnimatePresence, motion } from "motion/react";
import { Spinner } from "../components/spinner";
import { ReducingText } from "../components/reducing-text";

export const DomainUpdate = () => {
  const [step, setStep] = useState(0);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    // preload the image
    const img = new Image();
    img.src = "/lucid-bg.webp";
    img.style.position = "absolute";
    img.style.top = "-9999px";
    img.style.left = "-9999px";
    img.style.width = "1px";
    img.style.height = "1px";
    img.style.zIndex = "-1000";
    img.style.opacity = "0";
    img.style.pointerEvents = "none";
    document.body.appendChild(img);

    return () => {
      document.body.removeChild(img);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStep(1);
      // 3500 ms on step 0 + 300 ms wait
    }, 3800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStep(2);
      // 1200 ms on step 1 + 300 ms wait
    }, 5300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStep(3);
      // 1500 ms on step 2 + 300 ms wait = 5300 + 1500 + 300 = 7100
    }, 7100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStep(4);
      // 300 ms on step 3 = 7100 + 300 = 7400
    }, 7400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScene(1);
      // 1000 ms on step 4 = 7400 + 1000 = 8400
    }, 8400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <AnimatePresence mode="popLayout">
        {scene === 0 ? (
          <motion.div
            key="scene-0"
            exit={{
              opacity: 0,
              filter: "blur(2px)",
              transition: {
                duration: 0.4,
              },
            }}
            className="relative flex items-center pt-2.5 pb-2 px-5 h-[3rem] rounded-full border border-gray-200 bg-white w-[24rem]"
          >
            {step === 0 ? (
              <TypingAnimation
                key="typing-animation-0"
                duration={125}
                delay={1200}
                customDelays={[
                  { indexOfDelay: 2, duration: 300 },
                  { indexOfDelay: 7, duration: 300 },
                  { indexOfDelay: 8, duration: 200 },
                ]}
                className="text-2xl font-normal h-[2.1rem]"
              >
                getlucid.app
              </TypingAnimation>
            ) : null}
            {step === 1 ? (
              <ReducingText key="reducing-text-0" initialText="getlucid.app" />
            ) : null}
            {step === 2 ? (
              <TypingAnimation
                key="typing-animation-1"
                duration={125}
                customDelays={[
                  { indexOfDelay: 5, duration: 300 },
                  { indexOfDelay: 6, duration: 200 },
                ]}
                className="text-2xl font-normal h-[2.1rem]"
              >
                lucid.so
              </TypingAnimation>
            ) : null}
            {step === 3 || step === 4 ? (
              <p className="text-2xl font-normal h-[2.1rem]">lucid.so</p>
            ) : null}
            {step <= 3 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="absolute top-1/2 -translate-y-1/2 right-4"
                strokeLinecap="round"
              >
                <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
              </svg>
            ) : (
              <Spinner className="absolute top-1/2 -translate-y-1/2 right-4 text-foreground" />
            )}
            {step === 3 ? (
              <motion.div
                key="button-1"
                initial={{
                  y: 8,
                  opacity: 0,
                  filter: "blur(2px)",
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.1,
                }}
                className="fixed bottom-1/5 left-1/2 -translate-x-1/2 w-[5rem] h-[3rem] bg-gray-900/70 flex items-center justify-center rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                  <path d="m9 10-5 5 5 5" />
                </svg>
              </motion.div>
            ) : null}
          </motion.div>
        ) : null}
        {scene === 1 ? (
          <motion.div
            key="scene-1"
            className="h-[100vh] bg-[linear-gradient(to_right,rgb(255,255,255,0.25),rgb(255,255,255,0),rgb(255,255,255,0.25))] bg-cover bg-center w-[100vw] flex items-center justify-center"
            initial={{
              y: "100vh",
              filter: "blur(10px)",
            }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.2,
              stiffness: 20,
              damping: 5,
            }}
          >
            <motion.img
              src="/lucid-bg.webp"
              alt=""
              className="absolute top-0 left-0 w-[100vw] h-[100vh] object-cover z-0"
              initial={{
                scale: 1,
              }}
              animate={{
                scale: 1.1,
              }}
              transition={{
                delay: 2.4,
                duration: 6,
                ease: "easeInOut",
              }}
            />
            <motion.h1
              initial={{
                opacity: 0,
                filter: "blur(2px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.4,
                delay: 1.2,
              }}
              className="text-center text-black font-instrument-serif max-w-[650px] px-4 text-[3.5rem] font-medium leading-[1.1] tracking-tight sm:px-6 sm:text-7xl md:px-0 lg:text-8xl"
            >
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 1.2 }}
                className="mr-6"
              >
                Writing
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 1.6 }}
                className="italic"
              >
                Reimagined
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 2.0 }}
                className="mr-6"
              >
                Through
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 2.4 }}
              >
                AI
              </motion.span>
            </motion.h1>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
