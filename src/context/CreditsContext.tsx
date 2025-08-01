import { createContext, useContext, useState, type ReactNode } from "react";
import type { Salon } from "../data/salons";

interface CreditsContextProps {
  credits: number;
  reserve: (salon: Salon) => boolean;
}

const CreditsContext = createContext<CreditsContextProps | undefined>(undefined);

export function CreditsProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(20);

  const reserve = (salon: Salon) => {
    if (credits >= salon.creditCost) {
      setCredits((c) => c - salon.creditCost);
      return true;
    }
    return false;
  };

  return (
    <CreditsContext.Provider value={{ credits, reserve }}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditsContext);
  if (!context) throw new Error("useCredits must be used within CreditsProvider");
  return context;
}
