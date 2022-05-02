import { useViewportSize } from "@mantine/hooks";

export function useViewportRatio() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  return viewportWidth / viewportHeight;
}