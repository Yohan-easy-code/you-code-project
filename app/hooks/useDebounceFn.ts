import { useCallback, useEffect, useRef } from "react";

export const useDebounceFn = <T extends unknown[]>(
  fn: (...args: T) => Promise<void> | void,
  delay = 500,
) => {
  const fnRef = useRef(fn);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      void fnRef.current(...args);
    }, delay);
  }, [delay]);
};
