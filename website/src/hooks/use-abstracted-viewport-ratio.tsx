import { useViewportRatio } from "./use-viewport-ratio";

export function useAbstractedViewportRatio(): "h" | "v" {
  const viewportRatio  = useViewportRatio();
  
  if (viewportRatio < 1) return "v"
  else return "h";
} 