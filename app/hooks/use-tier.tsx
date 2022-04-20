import { useMemo } from "react";

export const useTier = (yaks_delivered: number | undefined) => {
  return useMemo(() => {
    if (yaks_delivered) {
      if (yaks_delivered === 140) {
        return 3;
      }
      if (yaks_delivered >= 60) {
        return 2;
      }
      if (yaks_delivered >= 20) {
        return 1;
      }
    }
    return 0;
  }, [yaks_delivered]);
};
