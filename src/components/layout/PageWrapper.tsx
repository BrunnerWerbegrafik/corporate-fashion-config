import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";

interface PageWrapperProps {
  theme: "light" | "dark";
  children: ReactNode;
}

export function PageWrapper({ theme, children }: PageWrapperProps) {
  const themeClass = theme === "dark" ? "theme-dark" : "theme-light";

  return (
    <div className="stage-shell min-h-screen">
      <div className={`app-stage ${themeClass} relative min-h-screen flex flex-col overflow-hidden`}>
        <TopNav theme={theme} />
        <main className="flex-1 w-full">{children}</main>
        <Footer theme={theme} />
      </div>
    </div>
  );
}
