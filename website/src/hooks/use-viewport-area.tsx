import { useViewportSize } from "@mantine/hooks";

export function userViewportArea() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  return viewportWidth * viewportHeight / 100000;
}