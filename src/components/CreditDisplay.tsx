import { useEffect, useState } from "react";

interface CreditDisplayProps {
  credits: number;
}

export function CreditDisplay({ credits }: CreditDisplayProps) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [credits]);

  return (
    <span
      className={`text-purple-600 font-bold transition-all duration-500 ${
        animating ? "scale-125 text-red-500" : "scale-100 text-purple-600"
      }`}
    >
      {credits}
    </span>
  );
}
