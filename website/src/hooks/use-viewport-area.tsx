import { useViewportSize } from "@mantine/hooks";

export function useViewportArea() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  return viewportWidth * viewportHeight / 100000;
}