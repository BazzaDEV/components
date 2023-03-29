import { useEffect, useState, useCallback } from 'react';
import { isSSR } from '../utils';
import useWindowSize from './useWindowSize';

const useBreakpoint = (): string | undefined => {
  const { width } = useWindowSize();
  const getBreakpoint = useCallback(
    () =>
      isSSR
        ? undefined
        : window
          .getComputedStyle(document.body, '::after')
          .content.replace(/"/g, ''),
    []
  );
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    setBreakpoint(getBreakpoint);
  }, [width, getBreakpoint]);

  return breakpoint;
};

export default useBreakpoint;