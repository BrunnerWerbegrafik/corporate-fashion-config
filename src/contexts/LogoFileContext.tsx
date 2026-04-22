import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LogoFileContextValue {
  logoFile: File | null;
  setLogoFile: (f: File | null) => void;
}

const LogoFileContext = createContext<LogoFileContextValue | null>(null);

export function LogoFileProvider({ children }: { children: ReactNode }) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  return (
    <LogoFileContext.Provider value={{ logoFile, setLogoFile }}>
      {children}
    </LogoFileContext.Provider>
  );
}

export function useLogoFile(): LogoFileContextValue {
  const ctx = useContext(LogoFileContext);
  if (!ctx) throw new Error("useLogoFile must be used within LogoFileProvider");
  return ctx;
}
