import * as React from "react";

interface PortalContextType {
  setPortalContent: (content: React.ReactNode | null) => void;
}

const PortalContext = React.createContext<PortalContextType>({
  setPortalContent: () => {},
});

export function usePortal() {
  return React.useContext(PortalContext);
}

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<React.ReactNode | null>(null);

  return (
    <PortalContext.Provider value={{ setPortalContent: setContent }}>
      {children}
      {content}
    </PortalContext.Provider>
  );
}
