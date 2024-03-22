import { useEffect, useState } from "react";

//detects changes in window size
export const useWindowSize = () => {
  if (typeof window === "undefined") {
    // Return a default value
    return [0, 0];
  }
  const [size, setSize] = useState<number[]>([0, 0]);

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
