import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CreditDisplayProps {
  credits: number;
}

export function CreditDisplay({ credits }: CreditDisplayProps) {
  const [display, setDisplay] = useState(credits);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (credits < display) {
      setFlash(true);
      const timeout = setTimeout(() => setFlash(false), 500);
      setDisplay(credits);
      return () => clearTimeout(timeout);
    } else {
      setDisplay(credits);
    }
  }, [credits]);

  return (
    <AnimatePresence>
      <motion.span
        key={display}
        initial={{ scale: 1 }}
        animate={{ scale: flash ? 1.3 : 1, color: flash ? "#9333EA" : "#6B21A8" }}
        transition={{ duration: 0.3 }}
        className="font-mono"
      >
        {display}
      </motion.span>
    </AnimatePresence>
  );
}
