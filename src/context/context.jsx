import { createContext, useState } from "react";

export const connectionProvider = createContext();

export const StoreProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const sidebartrigger = (value) => {
        console.log("sidebartrigger=============>:", value);
        setCollapsed(value);
      };
    return (
        <connectionProvider.Provider
          value={{
            collapsed,
            sidebartrigger
          }}
        >
          {children}
        </connectionProvider.Provider>
      );
    
}
