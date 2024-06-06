import { createContext, useState } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(prevSize => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => prevSize - 2);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
