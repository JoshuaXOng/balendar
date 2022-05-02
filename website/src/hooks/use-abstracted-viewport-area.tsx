import { useViewportSize } from "@mantine/hooks";

export function useAbstractedViewportArea(): "small" | "medium" | "large" {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  const viewportArea = viewportWidth * viewportHeight / 100000;

  if (viewportArea < 2.5)
    return "small"
  
  if (viewportArea < 6) 
    return "medium"

  return "large"
}