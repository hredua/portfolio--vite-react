import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [projectTheme, setProjectTheme] = useState("ui"); // ui | api | bot
  const value = useMemo(
    () => ({ projectTheme, setProjectTheme }),
    [projectTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useProjectTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useProjectTheme must be used inside ThemeProvider");
  return ctx;
}
