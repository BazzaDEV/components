import { useEffect, useRef } from 'react';
import useResponsiveObserver, { ScreenMap } from '../utils/responsiveObserver';
import useForceUpdate from '../utils/useForceUpdate';

export default function useBreakpoint(refreshOnChange: boolean = true): ScreenMap {
  const screensRef = useRef<ScreenMap>({});
  const forceUpdate = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();

  useEffect(() => {
    const token = responsiveObserver.subscribe((supportScreens) => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });

    return () => responsiveObserver.unsubscribe(token);
  }, []);

  return screensRef.current;
};