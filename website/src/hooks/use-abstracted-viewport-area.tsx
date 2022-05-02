import { useViewportSize } from "@mantine/hooks";

export function useAbstractedViewportArea(): "s" | "sm" | "m" | "l" {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  const viewportArea = viewportWidth * viewportHeight / 100000;
  console.log(viewportArea)
  if (viewportArea < 2.5)
    return "s"
  
  if (viewportArea < 4.5) 
    return "sm"

  if (viewportArea < 7.5) 
    return "m"

  return "l"
}