import { useViewportSize } from "@mantine/hooks";

export function userViewportRatio() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  return viewportWidth / viewportHeight;
}