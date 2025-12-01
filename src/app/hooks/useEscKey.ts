import { useEffect, RefObject } from 'react';

const useEscKey = (ref: RefObject<HTMLElement | null> | null, handler: () => void, isActive: boolean = true) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (!isActive) return;

      if (ref?.current) {
        const activeElement = document.activeElement as Node;
        if (!ref.current.contains(activeElement)) {
          return;
        }
      }

      if (event.key === 'Escape') handler();
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [ref, handler, isActive]);
};

export default useEscKey;